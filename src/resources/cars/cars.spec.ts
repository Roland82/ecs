import request from 'supertest'
import app from '../../app'


describe('POST /cars', () => {
  it('responds with a 201 when posted to with all the required data to create a new car', () => {
    const body = {
      make: 'Vauxhall',
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }
    return request(app)
      .post('/cars').send(body)
      .expect(201)
  })

  it('responds with a 400 when posted with a blank car make', () => {
    const body = {
      make: '',
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }
    return request(app)
      .post('/cars').send(body)
      .expect(400)
  })

  it('responds with a 400 when posted with a blank car model', () => {
    const body = {
      make: 'Vauxhall',
      model: '',
      colour: 'Silver',
      year: 2007,
    }
    return request(app)
      .post('/cars').send(body)
      .expect(400)
  })

  it('responds with a 400 when posted with a blank car colour', () => {
    const body = {
      make: 'Vauxhall',
      model: 'Astra SRi',
      colour: '',
      year: 2007,
    }
    return request(app)
      .post('/cars').send(body)
      .expect(400)
  })

  it('responds with a 400 when posted with a null car production year', () => {
    const body = {
      make: 'Vauxhall',
      model: 'Astra SRi',
      colour: 'Red',
      year: null,
    }
    return request(app)
      .post('/cars').send(body)
      .expect(400)
  })

})

describe('GET /cars/:id', () => {
  it('responds with a 404 when a car with the id cannot be found', () => {
    return request(app)
      .get('/cars/10000000000').send()
      .expect(404)
  })

  it('responds with a 200 and the car data when a previously saved car is found', async () => {
    const carBody = {
      make: 'Ford',
      model: 'Fiesta 1.1l',
      colour: 'Blue',
      year: 2008,
    }
    const postResponse = await request(app)
      .post('/cars').send(carBody)
      .expect(201)

    const carResourceLocation = postResponse.headers['content-location']

    const getResponse = await request(app)
      .get(carResourceLocation).send()
      .expect(200)

    expect(getResponse.body.id).not.toBeNull()
    expect(getResponse.body.make).toBe('Ford')
    expect(getResponse.body.model).toBe('Fiesta 1.1l')
    expect(getResponse.body.colour).toBe('Blue')
    expect(getResponse.body.year).toBe(2008)
  })
})

describe('DELETE /cars/:id when deleting a car id that exists', () => {
  let carResourceUri: string
  let deleteCarResponseCode: number

  beforeAll(async () => {
    const carBody = {
      make: 'Ford',
      model: 'Fiesta 1.1l',
      colour: 'Blue',
      year: 2008,
    }

    const postResponse = await request(app)
      .post('/cars').send(carBody)
      .expect(201)

    carResourceUri = postResponse.headers['content-location']

    const deleteCarResponse = await request(app)
      .delete(carResourceUri)

    deleteCarResponseCode = deleteCarResponse.statusCode
  })

  it('responds with a 204 when a car with the id is deleted successfully', () => {
    expect(deleteCarResponseCode).toBe(204)
  })

  it('responds with a 404 if the car with the given deleted id is accessed', () => {
    return request(app)
      .get(carResourceUri)
      .expect(404)
  })
})

describe('DELETE /cars/:id when deleting a car id that doesnt exist', () => {
  it('responds with a 204', () => {
    return request(app)
      .delete('/cars/10000000000').expect(204)
  })
})