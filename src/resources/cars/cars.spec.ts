import request from 'supertest'
import nock from 'nock'
import app from '../../app'

const dataMuseWordsDefaultResponseBody = [
  {'word': 'Test', 'score': 95, 'numSyllables': 2},
  {'word': 'Words', 'score': 95, 'numSyllables': 2},
  {'word': 'Here', 'score': 95, 'numSyllables': 2},
]

const dataMuseApiMock = nock('https://api.datamuse.com')

const mockDataMuseApi = (options:{ carMake: string, returnStatusCode: number, responseBody: any } ) => {
  dataMuseApiMock.get(`/words?sl=${options.carMake}`).reply(options.returnStatusCode, options.responseBody)
}

describe('POST /cars', () => {
  it('responds with a 201 when posted to with all the required data to create a new car', () => {
    const body = {
      make: "Vauxhall",
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

describe('GET /cars/:id when requesting a car id that doesnt exist', () => {
  it('responds with a 404', () => {
    return request(app)
      .get('/cars/10000000000').send()
      .expect(404)
  })
})

describe('GET /cars/:id when requesting a car id that exists and the word similarity service provided some data', () => {
  const carBody = {
    make: 'Ford',
    model: 'Fiesta 1.1l',
    colour: 'Blue',
    year: 2008,
  }

  let getResponse: request.Response

  beforeAll(async () => {
    mockDataMuseApi({ carMake: carBody.make, returnStatusCode: 200, responseBody: dataMuseWordsDefaultResponseBody })

    const postResponse = await request(app)
      .post('/cars').send(carBody)
      .expect(201)

    const carResourceLocation = postResponse.headers['content-location']

    getResponse = await request(app)
      .get(carResourceLocation).send()
      .expect(200)
  })

  it('responds with a 200',() => {
    expect(getResponse.statusCode).toBe(200)
  })

  it('returns the user supplied car data', () => {
    expect(getResponse.body.id).not.toBeNull()
    expect(getResponse.body.make).toBe('Ford')
    expect(getResponse.body.model).toBe('Fiesta 1.1l')
    expect(getResponse.body.colour).toBe('Blue')
    expect(getResponse.body.year).toBe(2008)
  })

  it('returns the similar words as a string', () => {
    expect(getResponse.body.similarWordsToMake).toBe('Test,Words,Here')
  })
})

describe('GET /cars/:id when requesting a car id that exists and the word similarity service failed to provide data', () => {
  const carBody = {
    make: 'Ford',
    model: 'Fiesta 1.1l',
    colour: 'Blue',
    year: 2008,
  }

  let getResponse: request.Response

  beforeAll(async () => {
    mockDataMuseApi({ carMake: carBody.make, returnStatusCode: 500, responseBody: {} })

    const postResponse = await request(app)
      .post('/cars').send(carBody)
      .expect(201)

    const carResourceLocation = postResponse.headers['content-location']

    getResponse = await request(app)
      .get(carResourceLocation).send()
      .expect(200)
  })

  it('responds with a 200', () => {
    expect(getResponse.statusCode).toBe(200)
  })

  it('returns the user supplied car data', () => {
    expect(getResponse.body.id).not.toBeNull()
    expect(getResponse.body.make).toBe('Ford')
    expect(getResponse.body.model).toBe('Fiesta 1.1l')
    expect(getResponse.body.colour).toBe('Blue')
    expect(getResponse.body.year).toBe(2008)
  })

  it('returns the similar words as null', () => {
    expect(getResponse.body.similarWordsToMake).toBeNull()
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

    mockDataMuseApi({ carMake: carBody.make, returnStatusCode: 200, responseBody: dataMuseWordsDefaultResponseBody })

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