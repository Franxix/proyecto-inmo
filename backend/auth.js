const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { usuarioSchema, loginSchema } = require('./validaciones')

const router = express.Router()
const prisma = new PrismaClient()

const SECRET = 'proyecto_inmo_secret_key'

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, tipo, telefono } = usuarioSchema.parse(req.body)

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExiste) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    const passwordEncriptada = await bcrypt.hash(password, 10)

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordEncriptada,
        tipo,
        telefono
      }
    })

    res.json({ mensaje: 'Usuario registrado correctamente', id: usuario.id })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errores: error.issues.map(e => e.message) })
    }
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, nombre: usuario.nombre })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errores: error.issues.map(e => e.message) })
    }
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

module.exports = router