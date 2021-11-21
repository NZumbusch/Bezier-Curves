import Point from "./point";
import Straight from "./straight";
import Vector from "./vector";



// Class for planes
export default class Plane {
    private positionalVector: Vector = new Vector();
    private normalVector: Vector = new Vector();


    constructor (positionalVector: Vector, normalVector: Vector) {
        this.positionalVector = positionalVector;
        this.normalVector = normalVector;
    }




    static getPlaneFromPoints (v1: Vector, v2: Vector, v3: Vector): Plane {
        let directionalVector1 = Vector.subtractVectors(v2, v1);
        let directionalVector2 = Vector.subtractVectors(v3, v1);

        let normalVector = Vector.crossProduct(directionalVector1, directionalVector2);
        
        return new Plane(v1, normalVector);
    }



    static getPlaneFromCoordinateForm (a: number, b: number, c: number, d: number) {
        let normalVector = new Vector(a, b, c);



        /*
         Parse d into actual positional vector
        */
        let positionalVector: Vector = new Vector();
        if (d !== 0) { // If d is 0, the positional vector can have 0, 0, 0
            if (a === 0) {
                if (b === 0) {
                    // normal vectors have to have at least one part which is not 0, so c cant be 0
                    if (c === 0) {
                        console.error("Plane::getPlaneFromCoordinateForm normal vector cant be null vector")
                        return new Plane(new Vector(), new Vector());
                    }
    
                    positionalVector = new Vector(0, 0, d / c);
                } else {
                    // Doesnt matter whether c is 0 or not, just defaulting to setting using b as b isnt 0 and you only need one number to be != 0
                    positionalVector = new Vector(0, d / b, 0);
                }
            } else {
                // doesnt matter whether b or c is 0 or something else as you only need one number to be != 0
                positionalVector = new Vector(d / a, 0, 0);
            }
        }

        // return plane
        return new Plane(positionalVector, normalVector);
    }




    static pointOnPlane (plane: Plane, point: Point): boolean {
        let coordinateForm = plane.getCoordinateForm();



         // total is total of left side of coordinate form with point put into it
        let total: number = coordinateForm.a * point.getPosition()[0] + coordinateForm.b * point.getPosition()[1] + coordinateForm.c * point.getPosition()[2];
        if (total === coordinateForm.d) {
            return true;
        } else {
            return false;
        }
    }




    static getClosestPointOnPlaneFromPoint (plane: Plane, point: Point) {
        // Creating a striaght with on point with normal vector of plane as directional vector and then grabbing point in which is goes through plane
        return Plane.planeStraightCollision(plane, new Straight(Vector.getVectorFromPoint(point), plane.getNormalVector()));
    }




    static planeStraightCollision (plane: Plane, straight: Straight): Point | boolean {
        let coordinateForm = plane.getCoordinateForm();


        // test if no or infinite solutions
        if (Vector.dotProduct(plane.getNormalVector(), straight.getDirectionalVector()) === 0) {
            if (Plane.pointOnPlane(plane, Point.getPointFromVector(straight.getSupportVector()))) {
                return true;
            } else {
                return false;
            }
        }


        let dTotal = coordinateForm.d; // total is opposite side of ts and thus side of the d
        // Subtracting the expanded values of the normal vector times the same ones of the support vector from t as they are brought over to the side of d
        dTotal -= coordinateForm.a * straight.getSupportVector().getValues()[0];
        dTotal -= coordinateForm.b * straight.getSupportVector().getValues()[1];
        dTotal -= coordinateForm.c * straight.getSupportVector().getValues()[2];

        let tTotal: number = 0; // total of t
        tTotal += coordinateForm.a * straight.getDirectionalVector().getValues()[0];
        tTotal += coordinateForm.b * straight.getDirectionalVector().getValues()[1];
        tTotal += coordinateForm.c * straight.getDirectionalVector().getValues()[2];

        // dividing dTotal by tTotal to get value for 1t
        let t: number = dTotal / tTotal;

        return Point.getPointFromVector(Vector.addVectors(straight.getSupportVector(), Vector.scalarMultiplyVector(t, straight.getDirectionalVector())))
    }


    getNormalVector (): Vector { return this.normalVector; }
    getPositionalVector (): Vector { return this.positionalVector; }
    getCoordinateForm (): {a: number, b: number, c: number, d: number} {
        let normalVectorValues = this.normalVector.getValues();
        let positionalVectorValues = this.positionalVector.getValues();

        let a: number = normalVectorValues[0];
        let b: number = normalVectorValues[1];
        let c: number = normalVectorValues[2];
        let d: number = Vector.dotProduct(this.normalVector, this.positionalVector);
        return {a: a, b: b, c: c, d: d};
    }
}