import request from "supertest";
import app from "../../../app";
import { mockDataMuseApi } from "./testHelpers";

describe("PUT /cars when updating an existing resource with all required data and the word similarity service provided some data", () => {
  let getResponse: request.Response;

  beforeAll(async () => {
    const originalCarBody = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "Silver",
      year: 2007,
    };

    const updatedBody = {
      make: "Ford",
      model: "Fiesta",
      colour: "Blue",
      year: 2020,
    };

    mockDataMuseApi({
      carMake: originalCarBody.make,
      responseBody: [{ word: "Test", numSyllables: 1, score: 3 }],
      returnStatusCode: 200,
    });

    const postResponse = await request(app)
      .post("/cars")
      .send(originalCarBody)
      .expect(201);

    const carResourceLocation = postResponse.headers["content-location"];

    mockDataMuseApi({
      carMake: updatedBody.make,
      responseBody: [
        { word: "Updated", numSyllables: 1, score: 3 },
        { word: "Words", numSyllables: 1, score: 3 },
      ],
      returnStatusCode: 200,
    });

    await request(app).put(carResourceLocation).send(updatedBody).expect(200);

    getResponse = await request(app)
      .get(carResourceLocation)
      .send()
      .expect(200);
  });

  it("updates the car data to be as per what the user supplied", () => {
    expect(getResponse.body.id).not.toBeNull();
    expect(getResponse.body.make).toBe("Ford");
    expect(getResponse.body.model).toBe("Fiesta");
    expect(getResponse.body.colour).toBe("Blue");
    expect(getResponse.body.year).toBe(2020);
  });

  it("updates the similar words", () => {
    expect(getResponse.body.similarWordsToMake).toBe("Updated,Words");
  });
});

describe("PUT /cars when updating an existing resource with all required data and the word similarity service fails", () => {
  let getResponse: request.Response;

  beforeAll(async () => {
    const originalCarBody = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "Silver",
      year: 2007,
    };

    const updatedBody = {
      make: "Ford",
      model: "Fiesta",
      colour: "Blue",
      year: 2020,
    };

    mockDataMuseApi({
      carMake: originalCarBody.make,
      responseBody: [{ word: "Test", numSyllables: 1, score: 3 }],
      returnStatusCode: 200,
    });

    const postResponse = await request(app)
      .post("/cars")
      .send(originalCarBody)
      .expect(201);

    const carResourceLocation = postResponse.headers["content-location"];

    mockDataMuseApi({
      carMake: updatedBody.make,
      responseBody: [],
      returnStatusCode: 500,
    });

    await request(app).put(carResourceLocation).send(updatedBody).expect(200);

    getResponse = await request(app)
      .get(carResourceLocation)
      .send()
      .expect(200);
  });

  it("updates the car data to be as per what the user supplied", () => {
    expect(getResponse.body.id).not.toBeNull();
    expect(getResponse.body.make).toBe("Ford");
    expect(getResponse.body.model).toBe("Fiesta");
    expect(getResponse.body.colour).toBe("Blue");
    expect(getResponse.body.year).toBe(2020);
  });

  it("nulls out the similar words", () => {
    expect(getResponse.body.similarWordsToMake).toBeNull();
  });
});

const createCarAndGetResourceLocation = async () => {
  const body = {
    make: "Vauxhall",
    model: "Astra SRi",
    colour: "Silver",
    year: 2007,
  };

  const postResponse = await request(app).post("/cars").send(body).expect(201);

  return postResponse.headers["content-location"];
};

describe("", () => {
  it("responds with a 400 when posted with a blank car make", async () => {
    const resourceLocation = await createCarAndGetResourceLocation();
    const body = {
      make: "",
      model: "Astra SRi",
      colour: "Silver",
      year: 2007,
    };
    return request(app).put(resourceLocation).send(body).expect(400);
  });

  it("responds with a 400 when posted with a blank car model", async () => {
    const resourceLocation = await createCarAndGetResourceLocation();
    const body = {
      make: "Vauxhall",
      model: "",
      colour: "Silver",
      year: 2007,
    };
    return request(app).put(resourceLocation).send(body).expect(400);
  });

  it("responds with a 400 when posted with a blank car colour", async () => {
    const resourceLocation = await createCarAndGetResourceLocation();
    const body = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "",
      year: 2007,
    };
    return request(app).put(resourceLocation).send(body).expect(400);
  });

  it("responds with a 400 when posted with a null car production year", async () => {
    const resourceLocation = await createCarAndGetResourceLocation();
    const body = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "Red",
      year: null,
    };
    return request(app).put(resourceLocation).send(body).expect(400);
  });
});
