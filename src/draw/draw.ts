import { Canvas, createCanvas, NodeCanvasRenderingContext2D } from 'canvas';
import fs from 'fs';
import Point from '../class/point';
import Vector from '../class/vector';
import Straight from '../class/straight';
import Plane from '../class/plane';


interface point {
    pos: number[],
    radius: number,
    color: string
}




// class for drawing canvas
export default class Draw {
    private width: number = 0;
    private height: number = 0;
    private canvas: Canvas | undefined;


    constructor (width: number, height: number) {
        this.width = width;
        this.height =  height;
    }



    saveBezierCurveImage (definitionPoints: Point[], elementPoints: Point[], cameraPosition: Point = new Point(0, 0, 0), canvasDistance: number = 100, canvasVectorOne: Vector = new Vector(0, 0, 1), canvasVectorTwo: Vector = new Vector(1, 0, 0)) {
        this.canvas = createCanvas(this.width, this.height);

        let context = this.canvas.getContext("2d");

        context.fillStyle = '#000';
        context.fillRect(0, 0, this.width, this.width);





        let points: point[] = [];
        definitionPoints.forEach((point, index) => {
            points.push({pos: point.getPosition(), radius: 2, color: "#be4bdb"})
        })
        elementPoints.forEach((point, index) => {
            points.push({pos: point.getPosition(), radius: 4, color: "#12b886"})
        })



        /*
        Get stuff for canvas and convert points to 2d canvas
        */
        let canvasNormalVector = Vector.crossProduct(canvasVectorOne, canvasVectorTwo);
        // Positional Vector or middle of canvas
        let canvasPositionalVector = Vector.scalarMultiplyVector( 
            canvasDistance / Vector.getAbsolute(canvasNormalVector), 
            Vector.addVectors(Vector.getVectorFromPoint(cameraPosition), canvasNormalVector)
        );
        let canvasPlane = new Plane(canvasPositionalVector, canvasNormalVector);



        let straightOne = new Straight(canvasPositionalVector, canvasVectorOne); // Vector from positional vector in width direction
        points.forEach((point, index) => {
            let straight = Straight.getStraightFromPoints(cameraPosition, new Point(point.pos[0], point.pos[2], point.pos[1]));
            let pointOnCanvas = Plane.planeStraightCollision(canvasPlane, straight);
            if (pointOnCanvas !== true && pointOnCanvas !== false) {
                let straightTwo = new Straight(new Vector(point.pos[0], point.pos[1], point.pos[2]), canvasVectorTwo);
                

                console.log(straightOne, straightTwo);
                let sCut = Straight.straightCutStraight(straightOne, straightTwo);
                if (sCut === false || sCut === true) {
                    throw new Error("Draw:saveBezierCurve no cut point, how is that even possible?")
                }
                let cutPoint = sCut.v;
                let cutR = sCut.r; // vertical
                let cutS = sCut.s; // horizontal



                // calculate horizontal offset
                let horizontalDimension = Vector.getAbsolute(Vector.subtractVectors(Vector.getVectorFromPoint(cutPoint), straightOne.getSupportVector()));
                if (cutR < 0) {
                    horizontalDimension *= -1; // invert as the absolute cannot be negative
                } else if (cutR === 0) {
                    horizontalDimension = 0;
                }


                // calculate vertical offset
                let verticalDimension = Vector.getAbsolute(Vector.subtractVectors(Vector.getVectorFromPoint(cutPoint), straightTwo.getSupportVector()));
                if (cutS < 0) {
                    verticalDimension *= -1; // invert as the absolute cannot be negative
                } else if (cutS === 0) {
                    verticalDimension = 0;
                }


                // draw point
                this.drawCircle(context, horizontalDimension, verticalDimension, point.radius, point.color, point.color, point.radius / 2)
            }
        })



        // Save image
        let buffer = this.canvas.toBuffer('image/png')
        fs.writeFileSync('./image.png', buffer)
    }




   private drawCircle (ctx: NodeCanvasRenderingContext2D, x: number, y: number, radius: number, fill: string, stroke: string, strokeWidth: number) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fill) {
          ctx.fillStyle = fill
          ctx.fill()
        }
        if (stroke) {
          ctx.lineWidth = strokeWidth
          ctx.strokeStyle = stroke
          ctx.stroke()
        }
    }
}