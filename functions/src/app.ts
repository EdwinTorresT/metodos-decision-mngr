import * as express from "express";
import * as cors from "cors";
import CalculatorController from "./controllers/calculatorController";

const app = express();

app.use(cors());

app.use(CalculatorController);

export default app;
