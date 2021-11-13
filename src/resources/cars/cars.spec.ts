import request from 'supertest'
import app from '../../app'


describe('POST /cars', () => {
  it('responds with a 200 when posted to with all the required data to create a new car', () => {
    const body = {
      make: 'Vauxhall',
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }
    request(app)
      .post('/cars').send(body)
      .expect(200)
  })
})

describe('GET /cars/:id', () => {
  it('responds with a 404 when a car with the id cannot be found', () => {
    request(app)
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
      .expect(200)

    const carResourceLocation = postResponse.headers['Content-Location']

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