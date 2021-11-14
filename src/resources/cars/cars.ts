import express, {Response} from 'express'
import Car from './CarModel'
import serialiseCar from './carSerialiser'
import axios from 'axios'
import { body, validationResult } from 'express-validator'

const router = express.Router()

let cars: Car[] = []

const fetchWordsSimilarTo = (word: String) =>
  axios.get<DataMuseSimilarWordsResponseBody>(`https://api.datamuse.com/words?sl=${word}` )
    .then(r => r.data.map(e => e.word).join(','))
    .catch(() => null)


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

    const similarWordsToCarMake = await fetchWordsSimilarTo(req.body.make)

    const carId = cars.length + 1
    cars.push(new Car(carId, req.body.make, req.body.model, req.body.colour, req.body.year, similarWordsToCarMake))

    return res.status(201).set('Content-Location', `/cars/${carId}`).send()
})


router.put(
  '/:id',
  async (req, res): Promise<Response> => {


    return res.sendStatus(200)
  })

router.get('/:id', async (req, res): Promise<Response> => {
  const car = cars.find(e => e.id.toString() === req.params.id)

  if (!car) {
    return res.sendStatus(404)
  }

  const responseBody = serialiseCar(car)
  return res.json(responseBody).status(200)
})

router.delete('/:id', async (req, res): Promise<Response> => {
  cars = cars.filter(e => e.id.toString() !== req.params.id)

  return res.sendStatus(204)
})


export default router