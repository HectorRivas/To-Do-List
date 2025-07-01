import express from 'express'
import { login } from '../controller/auth.controller.mjs'

const Router = express.Router();

// Ruta para el inicio de sesión
Router.post('/login', login)

// Ruta para el registro (aún no implementada)

export default Router