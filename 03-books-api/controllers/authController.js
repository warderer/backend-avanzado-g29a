import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  try {
  // Validar que el email y password vengan en el body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'email or password are missing'
      })
    }

    // Encriptar la contraseña con ayuda de bcrypt
    const saltRounds = 10 // El número de veces que se aplica el algoritmo de encriptación a la contraseña.
    const newPassword = await bcrypt.hash(req.body.password, saltRounds)

    // Reemplazar la contraseña de texto plano por la hasheada
    req.body.password = newPassword

    // Crear el usuario en la base de datos
    const newUser = await User.create(req.body)

    // Eliminar la contraseña del objeto de respuesta de la base de datos, por motivos de seguridad. Mongoose ignora las propiedades que tienen el valor de undefined
    newUser.password = undefined

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({ message: `error creating user: ${error}` })
  }
}

const login = async (req, res) => {
  // Validar que el email y password vengan en el body
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'email or password are missing'
    })
  }

  try {
    // Buscar en la base de datos un Usuario con el correo proporcionado
    const user = await User.findOne({ email: req.body.email })

    // Si no existe el user, devolvemos un error 404
    if (!user) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    // Si el correo existe, entonces comparo las contraseñas.
    const isPasswordValid = await bcrypt.compare(
      req.body.password, // contraseña enviada
      user.password // contraseña en la Base de Datos
    ) // devuelve un true o false (booleano)

    // Si la contraseña es incorrecta: 401: Unauthorized
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    // Si el usuario existe y la contraseña es la correcta, entonces CREO el Token

    // Construyendo el Payload
    const payload = {
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // fecha y hora de emisión en segundos
      exp: Math.floor(Date.now() / 1000 + (7 * 24 * 60 * 60)) // fecha y hora de expiración en 7 días
    }

    // Construyo el JWT
    const token = jwt.encode(payload, process.env.SECRET)

    // Devuelvo el token creado
    return res.json({
      message: 'Login Successfully',
      token
    })
  } catch (error) {
    res.status(500).json({ message: `Login error: ${error}` })
  }
}

export { register, login }
