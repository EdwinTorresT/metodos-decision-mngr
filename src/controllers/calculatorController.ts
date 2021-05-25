import { Request, Response, Router } from 'express';
import CalculatorService from '../services/calculator/calculator.service';

const CalculatorController = Router();

CalculatorController.post('/laplace', async (request: Request, response: Response) => {
    const matrix = validateMatrix(request, response);
    const p = request.body.value;
    await CalculatorService.executeLaplace(matrix, p).then((result: any) => {
        response.status(200).send(result);
    }).catch((error: any) => {
        response.status(500).send({ status: 500, data: error });
    });
});

CalculatorController.post('/pesimist', async (request: Request, response: Response) => {
    const matrix = validateMatrix(request, response);
    await CalculatorService.executePesimist(matrix).then((result: any) => {
        response.status(200).send(result);
    }).catch((error: any) => {
        response.status(500).send({ status: 500, data: error });
    });
});

CalculatorController.post('/optimist', async (request: Request, response: Response) => {
    const matrix = validateMatrix(request, response);
    await CalculatorService.executeOptimist(matrix).then((result: any) => {
        response.status(200).send(result);
    }).catch((error: any) => {
        response.status(500).send({ status: 500, data: error });
    });
});

CalculatorController.post('/hurwicz', async (request: Request, response: Response) => {
    const matrix = validateMatrix(request, response);
    const p = validateCoefficientHurwicz(request, response);
    await CalculatorService.executeHurwicz(matrix, p).then((result: any) => {
        response.status(200).send(result);
    }).catch((error: any) => {
        response.status(500).send({ status: 500, data: error });
    });
});

CalculatorController.post('/savage', async (request: Request, response: Response) => {
    const matrix = validateMatrix(request, response);
    await CalculatorService.executesavage(matrix).then((result: any) => {
        response.status(200).send(result);
    }).catch((error: any) => {
        response.status(500).send({ status: 500, data: error });
    });
});

const validateMatrix = (request: Request, response: Response) => {
    const matrix = request.body.matrix as Array<any>;
    if (matrix === undefined || matrix.length === 0) {
        response.status(403).send({ status: 403, data: 'No se ha enviado ninguna matriz' });
    }
    return matrix;
};

const validateCoefficientHurwicz = (request: Request, response: Response) => {
    const coefficient = request.body.coefficient as number;
    if (coefficient < 0 || coefficient > 1) {
        response.status(403).send({ status: 403, data: 'El coeficiente debe ser un valor entre 0 y 1' });
    }
    return coefficient;
}

export default CalculatorController;
