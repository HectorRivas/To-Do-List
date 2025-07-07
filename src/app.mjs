import dotenv from 'dotenv'
// Cargar las variables de entorno desde el archivo .env
dotenv.config()
import express from 'express'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { dirname as __dirname } from 'node:path'
import authRouter from './routes/auth.mjs'
import connectDB from './config/db.mjs'


console.log('Variables de entorno cargadas:', {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB: process.env.MONGO_DB,
  PORT: process.env.PORT
})

// Conectar a la base de datos
connectDB()

// Crear una instancia de Express
const app = express()

// Configuración de Express
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.set('views', 'src/views')


// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url)

const dirname = __dirname(__filename)


// Middleware para manejar JSON y URL codificada
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
// app.use('/user', userRouter)
// app.use('/admin', adminRouter)
app.use('/auth', authRouter)

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(join(dirname, 'public')))

// Configuración del puerto
// Usar el puerto definido en las variables de entorno o 3000 por defecto
const PORT = process.env.PORT ?? 3000

// Renderizar la vista 'login' en la raíz si no está en las rutas
app.get('/', (req, res) => {
  res.render('login',
    {
      title: 'Iniciar sesión',
      message: '¡Bienvenido a la aplicación de gestión de tareas! Inicia sesión para comenzar a organizar tus tareas y proyectos.',
      alert: "info"
    }
  )
})

app.get('/register', (req, res) => {
  res.render('register',
    {
      title: 'Registro',
      message: 'Por favor, completa todos los campos para registrarte.',
      alert: "info"
    }
  )
})

app.listen(PORT, () => {
  console.log(`App run inning on: http://localhost:${PORT}`)
})
