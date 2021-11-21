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


    static getStraightFromPoints (p1: Point, p2: Point): Straight {
        return new Straight(
            Vector.getVectorFromPoint(p1),
            Vector.subtractVectors(
                Vector.getVectorFromPoint(p2),
                Vector.getVectorFromPoint(p1)
            )
        );
    }



    static straightCutStraight (s1: Straight, s2: Straight): Point | boolean {
        let r: number | boolean = false; // s1
        let s: number | boolean = false; // s2

        // Test if some value is 0 and if then set the corresponding variable to the right value, testing for other parts later
        for (let i = 0; i < 3; i++) {
            if (s1.getDirectionalVector().getValues()[i] === 0 && s1.getDirectionalVector().getValues()[i] !== 0) {
                s = (s1.getSupportVector().getValues()[i] - s2.getSupportVector().getValues()[i]) / s2.getDirectionalVector().getValues()[i];
                break;
            } else if (s1.getDirectionalVector().getValues()[i] !== 0 && s1.getDirectionalVector().getValues()[i] === 0) {
                r = (s2.getSupportVector().getValues()[i] - s1.getSupportVector().getValues()[i]) / s1.getDirectionalVector().getValues()[i];
                break;
            }
        }

        if (r === false && s === false) { // No directional vector has 0 anywhere
            throw new Error("Calculation the cut between two straights of which no directional vector has 0 anywhere is not supportet yet.");
        }



        // Calculate other variable
        if (r !== false) {
            for (let i = 0; i < 3; i++) {
                if (s1.getDirectionalVector().getValues()[i])
            }
        }
    }




    public getSupportVector (): Vector { return this.supportVector; }
    public getDirectionalVector (): Vector { return this.directionalVector; }
}

