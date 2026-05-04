const jwt = require('jsonwebtoken')

const SECRET = 'proyecto_inmo_secret_key'

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' })
  }

  try {
    const verificado = jwt.verify(token, SECRET)
    req.usuario = verificado
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

module.exports = verificarToken