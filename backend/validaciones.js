const { z } = require('zod')

const propiedadSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().optional(),
  precio: z.number().positive('El precio debe ser mayor a 0'),
  moneda: z.enum(['ARS', 'USD']),
  direccion: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  barrio: z.string().min(2, 'El barrio debe tener al menos 2 caracteres'),
  latitud: z.number(),
  longitud: z.number(),
  metros_cuadrados: z.number().positive(),
  ambientes: z.number().int().positive(),
  es_torre: z.boolean().optional(),
  cochera: z.boolean().optional(),
  seguridad_24hs: z.boolean().optional(),
  amenities: z.array(z.string()).optional(),
  fotos: z.array(z.string()).optional()
})

const usuarioSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tipo: z.enum(['particular', 'inmobiliaria']).optional(),
  telefono: z.string().optional()
})

module.exports = { propiedadSchema, usuarioSchema }