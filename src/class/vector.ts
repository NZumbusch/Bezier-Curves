import Point from './point'



// class implementation of a vector 
export default class Vector {
    private points: number[] = [0, 0, 0];


    constructor (pointOne: number = 0, pointTwo: number = 0, pointThree: number = 0) {
        this.points[0] = pointOne;
        this.points[1] = pointTwo;
        this.points[2] = pointThree;
    }

    // Set points to new point
    setPointOneTo (point: number) {
        this.points[0] = point;
    }
    setPointTwoTo (point: number) {
        this.points[1] = point;
    }
    setPointThreeTo (point: number) {
        this.points[2] = point;
    }


    // get vector points
    getValues (): number[] {
        return this.points;
    }

    // Return point from this as positional vector
    toPoint (): Point {
        return new Point(this.getValues()[0], this.getValues()[1], this.getValues()[2]);
    }


    // check if vector is nullvector (All points 0)
    isNull (): boolean {
        return (this.points[0] === 0) && (this.points[1] === 0) && (this.points[1] === 0);
    }

    // returns vector as point as position vector 
    getPointFromVector (): Point {
        return new Point(this.points[0], this.points[1], this.points[2]);
    }


    // returns (position) vector of point
    static getVectorFromPoint (point: Point): Vector {
        let position = point.getPosition();
        return new Vector(position[0], position[1], position[2]);
    }   




    static addVectors (v1: Vector, v2: Vector): Vector {
        return new Vector(v1.getValues()[0] + v2.getValues()[0], v1.getValues()[1] + v2.getValues()[1], v1.getValues()[2] + v2.getValues()[2]);
    }


    static subtractVectors (v1: Vector, v2: Vector): Vector {
        return new Vector(v1.getValues()[0] - v2.getValues()[0], v1.getValues()[1] - v2.getValues()[1], v1.getValues()[2] - v2.getValues()[2]);
    }


    static scalarMultiplyVector (s: number, v: Vector): Vector {
        
        if (s === 0) {
            // null vector
            return new Vector();
        } else {
            // any other vector
            return new Vector(v.getValues()[0] * s, v.getValues()[1] * s, v.getValues()[2] * s);
        }
    }


    static dotProduct (v1: Vector, v2: Vector): number {
        return (v1.getValues()[0] * v2.getValues()[0]) + (v1.getValues()[1] * v2.getValues()[1]) + (v1.getValues()[2] * v2.getValues()[2]);
    }


    static crossProduct (v1: Vector, v2: Vector): Vector {
        let pointOne = v1.getValues()[2] * v2.getValues()[3] - v1.getValues()[3] * v2.getValues()[2];
        let pointTwo = v1.getValues()[3] * v2.getValues()[1] - v1.getValues()[1] * v2.getValues()[3];
        let pointThree = v1.getValues()[1] * v2.getValues()[2] - v1.getValues()[2] * v2.getValues()[1];

        return new Vector(pointOne, pointTwo, pointThree);
    }


    static getAbsolute (v: Vector): number {
        return Math.sqrt(Math.pow(v.getValues()[0], 2) + Math.pow(v.getValues()[1], 2) + Math.pow(v.getValues()[2], 2));
    }
}