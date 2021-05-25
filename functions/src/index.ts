import * as functions from "firebase-functions";
import app from './app';

export const apiCalculator = functions.https.onRequest(app);
