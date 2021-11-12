import request from 'supertest'
import app from '../../app'


describe('POST /cars', () => {
  it('responds with a 200 when posted to with all the required data to create a new car', async () => {
    const body = {
      make: 'Vauxhall',
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }
    await request(app)
      .post('/cars').send(body)
      .expect(200)
  })
})

describe('GET /cars/:id', () => {
  it('responds with a 404 when a car with the id cannot be found', async () => {
    await request(app)
      .get('/cars/10000000000').send()
      .expect(404)
  })
})