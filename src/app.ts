import * as express from "express";
import * as cors from "cors";
import CalculatorController from "./controllers/calculatorController";

const app = express();

// Middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Controllers
app.use(CalculatorController);

export default app;
