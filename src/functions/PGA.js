/**
 * Test functions.
 *
 * Source: Haupt, Randy L., and Sue Ellen Haupt. Practical genetic algorithms. John Wiley & Sons, 2004.
 */
import { registerFunction } from './functionLibrary';

const F1 = (x) => Math.abs(x) + Math.cos(x);
registerFunction('F1', {
    name: 'F1',
    fn: F1,
    defaultRanges: [[-20,20]],
    description: 'min: f(0) = 1'
})

const F7 = (x, y) => x * Math.sin(4 * x) + 1.1 * y * Math.sin(2 * y);
registerFunction('F7', {
    name: 'F7',
    fn: F7,
    defaultRanges: [[0,10],[0,10]],
    description: 'min: f(9.039, 8.668) = -18.5547',
})

const F8 = (x, y) => y * Math.sin(4 * x) + 1.1 * x * Math.sin(2 * y);
registerFunction('F8', {
    name: 'F8',
    fn: F8,
    defaultRanges: [[0,10],[0,10]],
    description: 'min: f(9.0400, 8.6645) = -18.5916'
})

const F16 = (x, y) => x * Math.sin(Math.sqrt(Math.abs(x - (y + 9)))) - (y + 9) * Math.sin(Math.sqrt(Math.abs(y + 0.5 * x + 9)));
registerFunction('F16', {
    name: 'F16',
    fn: F16,
    defaultRanges: [[-20,20],[-20,20]],
    description: 'min: f(-14.58, -20) = -23.806'
})
