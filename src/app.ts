import express, { Application } from "express";
import CarsRoute from "./resources/cars/cars";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cars", CarsRoute);

export default app;
