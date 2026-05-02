const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando' })
})

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001')
})