export default class CalculatorService {

    public static executeLaplace(matrix: Array<any>, value: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const valueExpected: any[] = [];
            matrix.forEach((row: any) => {
                let sum = 0;
                row.forEach((item: any) => {
                    sum +=((1/value) * item);
                });
                valueExpected.push(sum);
            });
            resolve({ data: valueExpected });
        });
    }

    public static executePesimist(matrix: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const valueExpected: any[] = [];
            matrix.forEach((row: any) => {
                let min = 0;
                min = Math.min.apply(Math, row);
                valueExpected.push(min);
            });
            resolve({ data: valueExpected });
        });
    }

    public static executeOptimist(matrix: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const valueExpected: any[] = [];
            matrix.forEach((row: any) => {
                let max = 0;
                max = Math.max.apply(Math, row);
                valueExpected.push(max);
            });
            resolve({ data: valueExpected });
        });
    }
    
    public static executeHurwicz(matrix: Array<any>, value: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const valueExpected: any[] = [];
            matrix.forEach((row: any) => {
                let min = 0;
                let max = 0;
                let h = 0;
                min = Math.min.apply(Math, row);
                max = Math.max.apply(Math, row);
                h = max * (value) + min * (1 - (value));
                valueExpected.push(h);
            });
            resolve({ data: valueExpected });
        });
    }

    public static executesavage(matrix: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const benefictsMatrix: any[] = [];
            const calculateBenefictsMatrix: any[] = [];
            const organizatedMatrix: any[] = [];
            const valueExpected: any[] = [];
            for (let col = 0; col < matrix[0].length; col++) {
                const tempM: any[] = [];
                for (let row = 0; row < matrix.length; row++) {
                    tempM.push(matrix[row][col]);
                }
                benefictsMatrix.push(tempM);
            }
            benefictsMatrix.forEach((item: any) => {
                let max = 0;
                const tempV: any[] = [];
                max = Math.max.apply(Math, item);
                item.forEach((element: any) => {
                    tempV.push(max - element);
                });
                calculateBenefictsMatrix.push(tempV);
            });
            calculateBenefictsMatrix.forEach((elementRow, row) => {
                const tempRow: any[] = [];
                calculateBenefictsMatrix.forEach((elementCol, col) => {
                    tempRow.push(calculateBenefictsMatrix[col][row]);
                });
                organizatedMatrix.push(tempRow);
            });
            organizatedMatrix.forEach((item: any) => {
                let max = 0;
                max = Math.max.apply(Math, item);
                valueExpected.push(max);
            });
            resolve({ data: { beneficts: benefictsMatrix, value: valueExpected } });
        });
    }
}
