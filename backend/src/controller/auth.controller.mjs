import { User } from '../models/user.mjs'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
	try {
		const { name, lastname, email, password, confirmPassword } = req.body

		// Validar que las contraseñas coincidan
		if (password !== confirmPassword) {
			return res.render('register', {
				title: 'Registro',
				message: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
				alert: 'warning'
			});
		}

		// Validar que todos los campos estén completos
		if (!name || !lastname || !email || !password) {
			return res.render('register', {
				title: 'Registro',
				message: 'Por favor, completa todos los campos.',
				alert: 'warning'
			});
		}
  
		// Verificar si el usuario ya existe
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.render('register', {
				title: 'Registro',
				message: 'El correo electrónico ya está en uso. Por favor, utiliza otro.',
				alert: 'warning'
			});
		}

		// Encriptar la contraseña antes de guardarla
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		// Crear un nuevo usuario
		const newUser = new User({ name, lastname, email, password: hashedPassword })
		await newUser.save()

		// Redirigir al inicio de sesión después del registro exitoso
		res.render('login', {
			title: 'Iniciar sesión',
			message: 'Usuario creado exitosamente. Por favor inicia sesión.',
			alert: 'success'
		})
	} catch (error) {
		console.error('Error al crear el usuario:', error)
		res.status(500).render('register', {
			title: 'Registro',
			message: 'Error al crear el usuario. Inténtalo de nuevo más tarde.',
			alert: 'error'
		})
	}
}

export const login = async (req, res) => {
	// Obtener las credenciales del cuerpo de la solicitud
	const { email, password } = req.body
	// Validar que ambos campos estén completos
	if (!email || !password) {
		return res.render('login', {
			title: 'Iniciar sesión',
			message: 'Por favor, completa todos los campos.',
			alert: 'warning'
		})
	}
	// Buscar al usuario por su nombre de usuario
	const user = await User.findOne({ email })
	if (!user) {
		return res.render('login', {
			title: 'Iniciar sesión',
			message: 'Usuario no encontrado. Por favor, verifica tus credenciales.',
			alert: 'warning'
		})
	}
	// Verificar la contraseña
	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		return res.render('login', {
			title: 'Iniciar sesión',
			message: 'Contraseña incorrecta. Por favor, intenta de nuevo.',
			alert: 'warning'
		})
	}

	// Si las credenciales son correctas, redirigir a la página de tareas
	res.render('layout', {
		title: 'Tareas',
		message: 'Has iniciado sesión correctamente.',
    user: {
      name: user.name,
      lastname: user.lastname,
      email: user.email
    }
    // alert: 'success'
	})
}