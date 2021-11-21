import Vector from './vector';



// Point instance
export default class Point {
    private position: number[] = [];




    // constructs point
    constructor (v1: number = 0, v2: number = 0, v3: number = 0) {
        this.position = [v1, v2, v3];

        return;
    }




    getPosition (): number[] {
        return this.position;
    }




    setPosition (v1: number, v2: number, v3: number): void {this.position = [v1, v2, v3];}
    setValueOne (value: number): void { this.position[0] = value; }
    setValueTwo (value: number): void { this.position[1] = value; }
    setValueThree (value: number): void { this.position[2] = value; }



    move (offset: Vector) {
        let newPosition = Vector.addVectors(Vector.getVectorFromPoint(this), offset);
        this.position = newPosition.getValues();
    }

    // get closest distance from point to this
    getDistanceFromPoint (point: Point): number {
        // distance from point to point
        return Vector.getAbsolute(Vector.subtractVectors(
            Vector.getVectorFromPoint(point),
            Vector.getVectorFromPoint(this)
        ))
    }




    static getPointFromVector (v: Vector): Point {
        return new Point(v.getValues()[0], v.getValues()[1], v.getValues()[2]);
    }
}