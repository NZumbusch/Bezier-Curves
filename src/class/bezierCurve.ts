import Point from "./point";
import Vector from "./vector";



// Class around bezier curves
export default class BezierCurve {
    private definitionPoints: Point[] = [];
    private cachedElementPoints: Point[] = [];



    static roundPrecision: number = 10;



    constructor (definitionPoints: Point[]) {
        this.definitionPoints = definitionPoints;
    }




    getCachedElementPoints (): Point[] { return this.cachedElementPoints; }
    getDefinitionPoints (): Point[] { return this.definitionPoints; }

    calculateElementPoints (precision: number, round: boolean = true): void {
        function binomial (n: number, k: number) {
            let coeff = 1;
            for (var x = n-k+1; x <= n; x++) coeff *= x;
            for (x = 1; x <= k; x++) coeff /= x;
            return coeff;
        }



        let n = this.definitionPoints.length - 1; // Number from definition element length - 1
        for (let r = 0; r <= 1; r += 1 / precision) { // has to get to precision for i / precision to end up at 1
            // point at 0, 0, 0 to be moved by calculation
            let p = new Point();
            
            this.definitionPoints.forEach((point, i) => {
                let scalarMultiplier = 0;


                // i is number from 0 to n
                let t = Math.round(r * Math.pow(10, BezierCurve.roundPrecision)) / Math.pow(10, BezierCurve.roundPrecision) // t is number from 0 to 1


                // Calculate scalar multiplier to later multiply with vector
                scalarMultiplier = binomial(n, i) * Math.pow(t, i) * Math.pow((1 - t), (n - i));


                // Round scalar multiplier
                if (round === true) {
                    scalarMultiplier = Math.round(scalarMultiplier * Math.pow(10, BezierCurve.roundPrecision)) / Math.pow(10, BezierCurve.roundPrecision);
                }


                // Move vector by (scalarMultiplier * positional vector of point)
                p.move(Vector.scalarMultiplyVector(scalarMultiplier, Vector.getVectorFromPoint(point)));
            })

            // Add point to cached elements
            this.cachedElementPoints.push(p);
        }

        return;
    }
}