import express, { Response } from "express";
import Car from "../../database/models/car";
import serialiseCar from "./carSerialiser";
import axios from "axios";
import { check } from "express-validator";
import { DataMuseSimilarWordsResponseBody, SimilarWordEntry } from "./types";
import handleValidationErrorMiddleware from "./handleValidationErrorMiddleware";

const router = express.Router();

const fetchWordsSimilarTo = (word: String): Promise<string | null> =>
  axios
    .get<DataMuseSimilarWordsResponseBody>(
      `https://api.datamuse.com/words?sl=${word}`
    )
    .then((r) => r.data.map((e: SimilarWordEntry) => e.word).join(","))
    .catch(() => null);

const validateCarRequestBody = [
  check("make").not().isEmpty(),
  check("model").not().isEmpty(),
  check("colour").not().isEmpty(),
  check("year").not().isEmpty(),
];

router.post(
  "/",
  ...validateCarRequestBody,
  handleValidationErrorMiddleware,
  async (req, res): Promise<Response> => {
    const similarWordsToCarMake = await fetchWordsSimilarTo(req.body.make);
    const car = await Car.create({
      make: req.body.make,
      model: req.body.model,
      colour: req.body.colour,
      year: req.body.year,
      wordsSimilarToMake: similarWordsToCarMake,
    });

    return res.status(201).set("Content-Location", `/cars/${car.id}`).send();
  }
);

router.put(
  "/:id",
  ...validateCarRequestBody,
  handleValidationErrorMiddleware,
  async (req, res): Promise<Response> => {
    const car = await Car.findByPk(req.params?.id);

    if (car) {
      const similarWordsToCarMake = await fetchWordsSimilarTo(req.body.make);
      await car.update({
        make: req.body.make,
        model: req.body.model,
        colour: req.body.colour,
        year: req.body.year,
        wordsSimilarToMake: similarWordsToCarMake,
      });
    }

    return res.sendStatus(200);
  }
);

router.get("/:id", async (req, res): Promise<Response> => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.sendStatus(404);
  }

  const responseBody = serialiseCar(car);
  return res.json(responseBody).status(200);
});

router.delete("/:id", async (req, res): Promise<Response> => {
  await Car.destroy({ where: { id: req.params.id } });

  return res.sendStatus(204);
});

export default router;
