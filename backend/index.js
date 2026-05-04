const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

const authRoutes = require('./auth')
app.use('/api/auth', authRoutes)

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando' })
})

// Traer todas las propiedades
app.get('/api/properties', async (req, res) => {
  try {
    const { barrio, ambientes, precio_max, precio_min } = req.query
    const filtros = {}
    if (barrio) filtros.barrio = barrio
    if (ambientes) filtros.ambientes = Number(ambientes)
    if (precio_min || precio_max) {
      filtros.precio = {}
      if (precio_min) filtros.precio.gte = Number(precio_min)
      if (precio_max) filtros.precio.lte = Number(precio_max)
    }
    const propiedades = await prisma.propiedad.findMany({ where: filtros })
    res.json(propiedades)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener propiedades' })
  }
})

// Crear una propiedad
app.post('/api/properties', async (req, res) => {
  try {
    const propiedad = await prisma.propiedad.create({ data: req.body })
    res.json(propiedad)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear propiedad' })
  }
})

// Traer una propiedad por ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const propiedad = await prisma.propiedad.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!propiedad) return res.status(404).json({ error: 'Propiedad no encontrada' })
    res.json(propiedad)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener propiedad' })
  }
})

// Editar una propiedad
app.put('/api/properties/:id', async (req, res) => {
  try {
    const propiedad = await prisma.propiedad.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
    res.json(propiedad)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar propiedad' })
  }
})

// Eliminar una propiedad
app.delete('/api/properties/:id', async (req, res) => {
  try {
    await prisma.propiedad.delete({ where: { id: Number(req.params.id) } })
    res.json({ mensaje: 'Propiedad eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar propiedad' })
  }
})

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001')
})