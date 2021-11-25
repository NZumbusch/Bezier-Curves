#!/usr/bin/env node

import Straight from "./class/straight";
import Point from "./class/point";
import BezierCurve from "./class/bezierCurve";

import Draw from './draw/draw'
import Vector from "./class/vector";

let bc = new BezierCurve([
    new Point(100, 100, 200),
    new Point(800, 100, 200),
    new Point(100, 100, 2000),
    new Point(1800, 100, 1400),
    new Point(2000, 100, 2000)
])
bc.calculateElementPoints(4000); 

let img = new Draw(2400, 2400);
img.saveBezierCurve2D(bc.getDefinitionPoints(), bc.getCachedElementPoints());

