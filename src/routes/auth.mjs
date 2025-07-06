import express from 'express'
import { login, createUser } from '../controller/auth.controller.mjs'

const Router = express.Router();

// Ruta para el inicio de sesión
Router.post('/login', login)

// Ruta para el registro
Router.post('/register', createUser)

export default Router