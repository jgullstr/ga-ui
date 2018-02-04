/**
 * Functions in this file from
 * https://en.wikipedia.org/wiki/Test_functions_for_optimization
 */

import { registerFunction } from './functionLibrary';

const ackley = (x,y) => {
    const args = [x,y];
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < args.length; i++) {
        sum1 += Math.pow(args[i], 2);
        sum2 += Math.cos(2*Math.PI*args[i]);
    }
    return -20.0*Math.exp(-0.2*Math.sqrt(sum1 / args.length)) + 20
    - Math.exp(sum2 / args.length) + Math.exp(1.0);
}

registerFunction('ACKLEY', {
    name: "Ackley's function",
    fn: ackley,
    defaultRanges: [[-5.12,5.12],[-5.12,5.12]],
    description: 'min: f(0,0) = 0'
})

const hoelder = (x,y) => - Math.abs(Math.sin(x)*Math.cos(y)*Math.exp(Math.abs(1 - Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) / Math.PI)));
registerFunction('HOELDER', {
    name: "Hölder table function",
    fn: hoelder,
    defaultRanges: [[-10,10],[-10,10]],
    description: 'min: -19.2085'
})

const himmelblau = (x,y) => Math.pow(Math.pow(x,2) + y - 11, 2) + Math.pow(x + Math.pow(y,2) - 7, 2)
registerFunction('HIMMELBLAU', {
    name: "Himmelblau's function",
    fn: himmelblau,
    defaultRanges: [[-5,5],[-5,5]],
    description: 'min: 0'
})

/*
// http://support.sas.com/documentation/cdl/en/ormpug/66851/HTML/default/viewer.htm#ormpug_nlpsolver_gettingstarted03.htm
const sas = (x,y) => Math.exp(Math.sin(50*x)) + Math.sin(60*Math.exp(y)) + Math.sin(70*Math.sin(x)) + Math.sin(Math.sin(80*y)) - Math.sin(10*(x+y)) + (x^2+y^2)/4;
registerFunction('SAS', {
    name: "SAS",
    fn: sas,
    defaultRanges: [[-1,1],[-1,1]],
    description: 'min: -3.306868647'
})
*/

/*
const crossInTray = (x,y) => {
    const base = Math.abs(Math.sin(x)*Math.sin(y)*Math.exp(
        Math.abs(100 - Math.sqrt(Math.pow(x,2) + Math.pow(y,2) / Math.PI))
    )) + 1;  
    return -0.0001*Math.pow(base,0.1)
}
registerFunction('CROSSINTRAY', {
    name: "Cross in tray function",
    fn: crossInTray,
    defaultRanges: [[-10,10],[-10,10]],
    description: 'min: f(+-1.34941, +-1.34941) = -2.06261'
})

console.log(crossInTray(1.34941, 1.34941))*/