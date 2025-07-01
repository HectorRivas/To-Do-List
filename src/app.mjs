import express from 'express'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { dirname as __dirname } from 'node:path'
import authRouter from './routes/auth.mjs'

const app = express()

app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.set('views', 'src/views')


// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url)
console.log('Archivo actual:', __filename)
const dirname = __dirname(__filename)
console.log('Directorio actual:', dirname)

// Middleware para manejar JSON y URL codificada
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
// app.use('/user', userRouter)
// app.use('/admin', adminRouter)
app.use('/auth', authRouter)

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(join(dirname, 'public')))
console.log('Archivos estáticos en:', join(dirname, 'public'))


const PORT = process.env.PORT ?? 3000

// Renderizar la vista 'login' en la raíz si no está en las rutas
app.get('/', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/layout', (req, res) => {
  res.render('layout',
    {
      title: 'Layout Page'
    }
  )
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}
    - http://localhost:${PORT}`)
})
