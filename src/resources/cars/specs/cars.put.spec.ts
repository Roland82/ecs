import request from 'supertest'
import app from '../../../app'

describe('PUT /cars when updating an existing resource with all required data',() => {

  let getResponse: request.Response

  beforeAll(async () => {
    const body = {
      make: "Vauxhall",
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }

    const updatedBody = {
      make: "Ford",
      model: 'Fiesta',
      colour: 'Blue',
      year: 2020,
    }

    const postResponse = await request(app)
      .post('/cars').send(body)
      .expect(201)

    const carResourceLocation = postResponse.headers['content-location']

    await request(app)
      .put(carResourceLocation).send(updatedBody)
      .expect(200)

    getResponse = await request(app)
      .get(carResourceLocation).send()
      .expect(200)
  })

  it('updates the car data to be as per what the user supplied', () => {
    expect(getResponse.body.id).not.toBeNull()
    expect(getResponse.body.make).toBe('Ford')
    expect(getResponse.body.model).toBe('Fiesta')
    expect(getResponse.body.colour).toBe('Blue')
    expect(getResponse.body.year).toBe(2020)
  })
})




describe('', () => {
  it('responds with a 400 when posted with a blank car make', () => {
    const body = {
      make: '',
      model: 'Astra SRi',
      colour: 'Silver',
      year: 2007,
    }
    return request(app)
      .put('/cars').send(body)
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
      .put('/cars').send(body)
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
      .put('/cars').send(body)
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
      .put('/cars').send(body)
      .expect(400)
  })
})