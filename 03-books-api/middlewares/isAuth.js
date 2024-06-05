import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  // Obtener el encabezado de Authorizacion: Bearer {token}
  const authHeader = req.headers.authorization

  // Valido que el header tenga un campo de authorization
  if (!authHeader) {
    return res.status(400).json({ message: 'Authorization Header is missing' })
  }

  // Dividir el encabezado de Authorization en 2 partes, el Bearer y el JWT.
  const [bearer, token] = authHeader.split(' ')

  // Verificar que la primera parte sea Bearer
  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: 'Authorization header format is Bearer {token}' })
  }

  // Verificar que el token no venga vacío
  if (!token) {
    return res.status(400).json({ message: 'Token not found' })
  }

  try {
  // Validar que el token sea válido y no este manipulado
    const payload = jwt.decode(token, process.env.SECRET)

    // Verificar si el token no ha expirado
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) { // Si la fecha de expiración es menor a la actual
      return res.status(401).json({ message: 'Token Expired' })
    }

    // Guardo el rol validado en la petición
    req.role = payload.role

    // Si todo esta bien, continuamos con la petición
    next()
  } catch (error) {
    return res.status(403).json({
      message: `Token error: ${error.message}` // 403: Forbidden
    })
  }
}

export { isAuth }
