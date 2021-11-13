import express, {Response} from 'express'
import Car from './CarModel'
import serialiseCar from './carSerialiser'
const { body, validationResult } = require('express-validator');

const router = express.Router()

const cars: Car[] = []

router.post(
  '/',
  body('make').not().isEmpty(),
  body('model').not().isEmpty(),
  body('colour').not().isEmpty(),
  body('year').not().isEmpty(),
  async (req, res): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }

    const carId = cars.length + 1
    cars.push(new Car(carId, req.body.make, req.body.model, req.body.colour, req.body.year))

    return res.status(200).set('Content-Location', `/cars/${carId}`).send()
})

router.get('/:id', async (req, res): Promise<Response> => {
  const car = cars.find(e => e.id.toString() === req.params.id)

  if (!car) {
    return res.sendStatus(404)
  }

  const responseBody = serialiseCar(car)
  return res.json(responseBody).status(200)
})


export default router