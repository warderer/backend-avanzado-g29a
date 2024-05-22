import Car from '../models/Car.js'

// Create
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body)
    res.status(201).json(newCar)
  } catch (error) {
    res.status(400).json({ message: `Error Creating Car: ${error}` })
  }
}
// Read

// Update

// Delete

export { createCar }
