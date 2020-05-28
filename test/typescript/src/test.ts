declare const require: any;
import * as path from 'path';
let myPath = path.join('./', '../');

import Test from './a';

let a = 0;
if (a) {
	let test: typeof Test = require('./a');
	console.log(test);
}

namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square();
