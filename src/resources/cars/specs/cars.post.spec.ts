import request from "supertest";
import app from "../../../app";
import { mockDataMuseApi } from "./testHelpers";

describe("POST /cars", () => {
  it("responds with a 201 when posted to with all the required data to create a new car", () => {
    const carBody = {
      make: "Ford",
      model: "Fiesta 1.1l",
      colour: "Blue",
      year: 2008,
    };

    mockDataMuseApi({
      carMake: carBody.make,
      returnStatusCode: 200,
      responseBody: [],
    });

    return request(app).post("/cars").send(carBody).expect(201);
  });

  it("responds with a 400 when posted with a blank car make", () => {
    const body = {
      make: "",
      model: "Astra SRi",
      colour: "Silver",
      year: 2007,
    };
    return request(app).post("/cars").send(body).expect(400);
  });

  it("responds with a 400 when posted with a blank car model", () => {
    const body = {
      make: "Vauxhall",
      model: "",
      colour: "Silver",
      year: 2007,
    };
    return request(app).post("/cars").send(body).expect(400);
  });

  it("responds with a 400 when posted with a blank car colour", () => {
    const body = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "",
      year: 2007,
    };
    return request(app).post("/cars").send(body).expect(400);
  });

  it("responds with a 400 when posted with a null car production year", () => {
    const body = {
      make: "Vauxhall",
      model: "Astra SRi",
      colour: "Red",
      year: null,
    };
    return request(app).post("/cars").send(body).expect(400);
  });
});
