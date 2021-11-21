#!/usr/bin/env node

import Straight from "./class/straight";
import Point from "./class/point";
import BezierCurve from "./class/bezierCurve";

import Draw from './draw/draw'

let bc = new BezierCurve([
    new Point(10, 10, 10),
    new Point(300, 980, 100),
    new Point(1000, 1000, 1000)
])
bc.calculateElementPoints(50); 

let img = new Draw(1200, 1200);
img.saveBezierCurveImage(bc.getDefinitionPoints(), bc.getCachedElementPoints());
