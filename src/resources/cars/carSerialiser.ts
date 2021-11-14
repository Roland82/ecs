import Car from './CarModel'

const serialiseCar = (car: Car) => {
  return {
    id: car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    colour: car.colour,
    similarWordsToMake: car.wordsSimilarToMake,
  }
}

export default serialiseCar