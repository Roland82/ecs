import express, {Response} from 'express'
import Car from './CarModel'
import serialiseCar from './carSerialiser'

const router = express.Router()


const cars: Car[] = []

router.post('/', async (req, res): Promise<Response> => {
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