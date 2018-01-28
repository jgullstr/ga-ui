/**
 * Trivial test functions.
 */
import { registerFunction } from './functionLibrary';

const square = (x) => Math.pow(x,2);
registerFunction('SQUARE', {
    name: 'Square',
    fn: square,
    defaultRanges: [[-20,20]],
    description: 'min: f(0) = 1'
});

const cube = (x) => Math.pow(x,3);
registerFunction('CUBE', {
    name: 'Cube',
    fn: cube,
    defaultRanges: [[-20,20]],
    description: 'min: f(0) = 1'
})

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

console.log(ackley(0,0));
console.log(ackley(1,0.32));

registerFunction('ACKLEY', {
    name: "Ackley's function",
    fn: ackley,
    defaultRanges: [[-5.12,5.12],[-5.12,5.12]],
    description: 'min: f(0) = 1'
})
