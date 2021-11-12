import express, { Response } from "express";
import Car from './CarModel'

const router = express.Router();


const cars: Car[] = []

router.post('/',  async (req, res): Promise<Response> => {
  const carId = cars.length + 1
  cars.push(new Car(carId,req.body.make, req.body.model, req.body.colour, req.body.year))

  return res.sendStatus(200)
})

router.get('/:id',  async (req, res): Promise<Response> => {
  const car = cars.find(e => e.id.toString() === req.params.id)

  if (!car) {
    return res.sendStatus(404)
  }

  return res.sendStatus(200)
})


export default router