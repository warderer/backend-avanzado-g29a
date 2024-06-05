import User from '../models/User.js'
import bcrypt from 'bcrypt'

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

export { register }
