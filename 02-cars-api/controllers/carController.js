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

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find() // equivalente a SELECT * FROM cars
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: `Error Getting Cars: ${error}` })
  }
}

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id) // equivalente a SELECT * FROM cars WHERE id = req.params.id
    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ message: `Error Getting Car: ${error}` })
  }
}

// Update

// Delete

export {
  createCar,
  getAllCars,
  getCarById
}
