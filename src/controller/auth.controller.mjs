export const login = (req, res) => {
    // Simular el inicio de sesión exitoso
    // Aquí podrías verificar las credenciales del usuario
    const { username, password } = req.body
    console.log('Credenciales recibidas:', { username, password })
    if (!username || !password) {
        return res.status(400).render('login', {
            title: 'Iniciar sesión',
            message: 'Por favor, completa todos los campos.'
        });
    }
    // Si las credenciales son correctas, redirigir a la página de tareas
    res.render('layout', {
        title: 'Tareas',
        message: 'Has iniciado sesión correctamente.'
    })
}