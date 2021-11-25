import Point from "./point";
import Vector from "./vector";



// class for straight lines
export default class Straight {
    private supportVector: Vector = new Vector();
    private directionalVector: Vector = new Vector();
    



    constructor (supportVector: Vector, directionalVector: Vector) {
        this.supportVector = supportVector;
        this.directionalVector = directionalVector;
    }



    roundSupportVector (precision: number) {
        this.supportVector.setPointOneTo(Math.round(this.supportVector.getValues()[0] * Math.pow(10, precision)) / Math.pow(10, precision));
        this.supportVector.setPointTwoTo(Math.round(this.supportVector.getValues()[1] * Math.pow(10, precision)) / Math.pow(10, precision));
        this.supportVector.setPointThreeTo(Math.round(this.supportVector.getValues()[2] * Math.pow(10, precision)) / Math.pow(10, precision));
    }




    static getStraightFromPoints (p1: Point, p2: Point): Straight {
        return new Straight(
            Vector.getVectorFromPoint(p1),
            Vector.subtractVectors(
                Vector.getVectorFromPoint(p2),
                Vector.getVectorFromPoint(p1)
            )
        );
    }




    static straightCutStraight (s1: Straight, s2: Straight, precision: number = 5): {v: Point, r: number, s: number} | boolean {
        let r: number | boolean = false; // s1
        let s: number | boolean = false; // s2


        // round to prevent things like 9.9999999999999999 instead of 10 breaking it
        s1.roundSupportVector(precision);
        s2.roundSupportVector(precision);




        // Test if some value is 0 and if then set the corresponding variable to the right value, testing for other parts later
        for (let i = 0; i < 3; i++) {
            // do both if there is no case in which both are != 0
            if (s1.getDirectionalVector().getValues()[i] === 0 && s2.getDirectionalVector().getValues()[i] !== 0) {
                s = (s1.getSupportVector().getValues()[i] - s2.getSupportVector().getValues()[i]) / s2.getDirectionalVector().getValues()[i];
            }
            if (s1.getDirectionalVector().getValues()[i] !== 0 && s2.getDirectionalVector().getValues()[i] === 0) {
                r = (s2.getSupportVector().getValues()[i] - s1.getSupportVector().getValues()[i]) / s1.getDirectionalVector().getValues()[i];
            }
        }

        if (r === false && s === false) { // No directional vector has 0 anywhere
            throw new Error("Straight::straightCutStraight Calculation the cut between two straights of which no directional vector has 0 anywhere is not supportet yet.");
        }


        // Calculate other variable
        if (r !== false) {
            for (let i = 0; i < 3; i++) {
                if (s1.getDirectionalVector().getValues()[i] !== 0 && s2.getDirectionalVector().getValues()[i] !== 0) {
                    // s = (a + dr - g) / j
                    s = (s2.getSupportVector().getValues()[i] + r * s2.getDirectionalVector().getValues()[i] - s1.getSupportVector().getValues()[i]) / s1.getDirectionalVector().getValues()[i];
                }
            }
        }
        if (s !== false) {
            for (let i = 0; i < 3; i++) {
                if (s1.getDirectionalVector().getValues()[i] !== 0 && s2.getDirectionalVector().getValues()[i] !== 0) {
                    // s = (a + dr - g) / j
                    r = (s1.getSupportVector().getValues()[i] + s * s1.getDirectionalVector().getValues()[i] - s2.getSupportVector().getValues()[i]) / s2.getDirectionalVector().getValues()[i];
                }
            }
        }




        if (r === false || s === false) {
            throw new Error("Straight::straightCutStraight r and or s false, which means that solution can not be validated.")
        }




        // validate solution if there is a solution or if there is not
        for (let i = 0; i < 3; i++) {
            // test if part of system matches for variables
            if (s1.getSupportVector().getValues()[i] + r * s1.getDirectionalVector().getValues()[i] !== s2.getSupportVector().getValues()[i] + s * s2.getDirectionalVector().getValues()[i]) {
                // does not match
                return false;
            }
        }

        return {
            v: 
                new Point(
                s1.getSupportVector().getValues()[0] + r * s1.getDirectionalVector().getValues()[0],
                s1.getSupportVector().getValues()[1] + r * s1.getDirectionalVector().getValues()[1],
                s1.getSupportVector().getValues()[2] + r * s1.getDirectionalVector().getValues()[2]
                ),
            s: s,
            r: r
        }
    }




    public getSupportVector (): Vector { return this.supportVector; }
    public getDirectionalVector (): Vector { return this.directionalVector; }
}

