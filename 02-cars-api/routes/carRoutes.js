import express from 'express'
import * as carController from '../controllers/carController.js'

const carRoutes = express.Router()

carRoutes.post('/cars', carController.createCar)
carRoutes.get('/cars', carController.getAllCars)
carRoutes.get('/cars/:id', carController.getCarById)
carRoutes.patch('/cars/:id', carController.updateCarById)
carRoutes.delete('/cars/:id', carController.deleteCarById)

export default carRoutes
