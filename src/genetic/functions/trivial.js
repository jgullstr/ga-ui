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
