const isAdmin = (req, res, next) => {
  if (req.role === 'ADMIN') {
    next()
  } else {
    res.status(403).json({ message: 'Unauthorized Role Access' })
  }
}

export { isAdmin }
