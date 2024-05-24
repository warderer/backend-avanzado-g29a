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
const updateCarById = async (req, res) => {
  // Para actualizar normalmente comprobamos si el carro existe (findById), y luego lo actualizamos (updateOne).
  // Pero en Mongoose podemos hacerlo en una sola línea con findByIdAndUpdate.
  // { new: true } es para que nos devuelva el carro actualizado
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(400).json({ message: `Error Updating Car: ${error}` })
  }
}

// Delete

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById
}
