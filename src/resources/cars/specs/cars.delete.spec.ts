import request from "supertest";
import app from "../../../app";
import { mockDataMuseApi } from "./testHelpers";

const dataMuseWordsDefaultResponseBody = [
  { word: "Test", score: 95, numSyllables: 2 },
  { word: "Words", score: 95, numSyllables: 2 },
  { word: "Here", score: 95, numSyllables: 2 },
];

describe("DELETE /cars/:id when deleting a car id that exists", () => {
  let carResourceUri: string;
  let deleteCarResponseCode: number;

  beforeAll(async () => {
    const carBody = {
      make: "Ford",
      model: "Fiesta 1.1l",
      colour: "Blue",
      year: 2008,
    };

    mockDataMuseApi({
      carMake: carBody.make,
      returnStatusCode: 200,
      responseBody: dataMuseWordsDefaultResponseBody,
    });

    const postResponse = await request(app)
      .post("/cars")
      .send(carBody)
      .expect(201);

    carResourceUri = postResponse.headers["content-location"];

    const deleteCarResponse = await request(app).delete(carResourceUri);

    deleteCarResponseCode = deleteCarResponse.statusCode;
  });

  it("responds with a 204 when a car with the id is deleted successfully", () => {
    expect(deleteCarResponseCode).toBe(204);
  });

  it("responds with a 404 if the car with the given deleted id is accessed", () => {
    return request(app).get(carResourceUri).expect(404);
  });
});

describe("DELETE /cars/:id when deleting a car id that doesnt exist", () => {
  it("responds with a 204", () => {
    return request(app).delete("/cars/10000000000").expect(204);
  });
});
