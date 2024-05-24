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
    const cars = await Car.find({ isActive: true }) // equivalente a SELECT * FROM cars WHERE isActive = true
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: `Error Getting Cars: ${error}` })
  }
}

const getCarById = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.id, isActive: true })
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
const deleteCarById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Car ID is required' })
  }

  // Borrado físico: Si el query string ?destroy=true, se borra el carro realmente de la base de datos.
  if (req.query.destroy === 'true') {
    try {
      const deletedCar = await Car.findByIdAndDelete(req.params.id) // Si el id no existe findByIdAndDelete devuelve null
      if (deletedCar === null) {
        return res.status(404).json({ message: 'Car Not Found for Delete' })
      }
      return res.status(204).json() // 204: No Content
    } catch (error) {
      return res.status(400).json({ message: `Error Deleting Car: ${error}` })
    }
  }

  // Borrado lógico: Si no se envía el query string ?destroy=true, se cambia el campo isActive a false.
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { isActive: false }, { new: false })
    // Solicite que se devuelva el documento antes de la actualización (el original) para verificar si el carro existe y si esta activo.
    if (updatedCar === null || updatedCar.isActive === false) {
      return res.status(404).json({ message: 'Delete: Car Not Found' })
    }
    return res.status(204).json() // 204: No Content
  } catch (error) {
    return res.status(400).json({ message: `Error Deleting Car: ${error}` })
  }
}

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById
}
