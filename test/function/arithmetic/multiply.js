// test multiply
var assert = require('assert'),
    math = require('../../../math.js'),
    approx = require('../../../tools/approx.js'),
    multiply = math.multiply,
    divide = math.divide,
    matrix = math.matrix,
    complex = math.complex,
    range = math.range,
    i = math.i,
    unit = math.unit;

// parser
approx.equal(math.eval('4 * 2'), 8);
approx.equal(math.eval('8 * 2 * 2'), 32);
approx.equal(math.eval('multiply(4, 2)'), 8);

// number
approx.equal(multiply(2, 3), 6);
approx.equal(multiply(-2, 3), -6);
approx.equal(multiply(-2, -3), 6);
approx.equal(multiply(5, 0), 0);
approx.equal(multiply(0, 5), 0);
approx.deepEqual(multiply(0, Infinity), NaN);
approx.deepEqual(multiply(2, Infinity), Infinity);
approx.deepEqual(multiply(-2, Infinity), -Infinity);

// complex
approx.deepEqual(multiply(complex(2, 3), 2), complex(4, 6));
approx.deepEqual(multiply(complex(2, -3), -2), complex(-4, 6));
approx.deepEqual(multiply(complex(2, -3), 2), complex(4, -6));
approx.deepEqual(multiply(complex(-2, 3), 2), complex(-4, 6));
approx.deepEqual(multiply(complex(-2, -3), 2), complex(-4, -6));
approx.deepEqual(multiply(2, complex(2, 3)), complex(4, 6));
approx.deepEqual(multiply(i, complex(2, 3)), complex(-3, 2));
approx.deepEqual(multiply(complex(0, 1), complex(2, 3)), complex(-3, 2));
approx.deepEqual(multiply(complex(1, 1), complex(2, 3)), complex(-1, 5));
approx.deepEqual(multiply(complex(2, 3), complex(1, 1)), complex(-1, 5));
approx.deepEqual(multiply(complex(2, 3), complex(2, 3)), complex(-5, 12));
approx.deepEqual(divide(complex(-5, 12), complex(2, 3)), complex(2, 3));
approx.deepEqual(multiply(complex(2, 3), 0), complex(0, 0));
approx.deepEqual(multiply(complex(0, 3), complex(0, -4)), complex(12, 0));
approx.deepEqual(multiply(multiply(3, i), multiply(-4, i)), complex(12, 0));
approx.deepEqual(multiply(math.i, Infinity), complex(0, Infinity));

approx.deepEqual(multiply(complex(2, 3), complex(4, 5)), complex(-7, 22));
approx.deepEqual(multiply(complex(2, 3), complex(4, -5)), complex(23, 2));
approx.deepEqual(multiply(complex(2, 3), complex(-4, 5)), complex(-23, -2));
approx.deepEqual(multiply(complex(2, 3), complex(-4, -5)), complex(7, -22));
approx.deepEqual(multiply(complex(2, -3), complex(4, 5)), complex(23, -2));
approx.deepEqual(multiply(complex(2, -3), complex(4, -5)), complex(-7, -22));
approx.deepEqual(multiply(complex(2, -3), complex(-4, 5)), complex(7, 22));
approx.deepEqual(multiply(complex(2, -3), complex(-4, -5)), complex(-23, 2));
approx.deepEqual(multiply(complex(-2, 3), complex(4, 5)), complex(-23, 2));
approx.deepEqual(multiply(complex(-2, 3), complex(4, -5)), complex(7, 22));
approx.deepEqual(multiply(complex(-2, 3), complex(-4, 5)), complex(-7, -22));
approx.deepEqual(multiply(complex(-2, 3), complex(-4, -5)), complex(23, -2));
approx.deepEqual(multiply(complex(-2, -3), complex(4, 5)), complex(7, -22));
approx.deepEqual(multiply(complex(-2, -3), complex(4, -5)), complex(-23, -2));
approx.deepEqual(multiply(complex(-2, -3), complex(-4, 5)), complex(23, 2));
approx.deepEqual(multiply(complex(-2, -3), complex(-4, -5)), complex(-7, 22));

// unit
assert.equal(multiply(2, unit('5 mm')).toString(), '10 mm');
assert.equal(multiply(2, unit('5 mm')).toString(), '10 mm');
assert.equal(multiply(unit('5 mm'), 2).toString(), '10 mm');
assert.equal(multiply(unit('5 mm'), 0).toString(), '0 m');

// string
assert.throws(function () {multiply("hello", "world")});
assert.throws(function () {multiply("hello", 2)});

// matrix, array, range
var a = matrix([[1,2],[3,4]]);
var b = matrix([[5,6],[7,8]]);
var c = matrix([[5],[6]]);
var d = matrix([[5,6]]);
approx.deepEqual(multiply(a, 3), matrix([[3,6],[9,12]]));
approx.deepEqual(multiply(3, a), matrix([[3,6],[9,12]]));
approx.deepEqual(multiply(a, b), matrix([[19,22],[43,50]]));
approx.deepEqual(multiply(a, c), matrix([[17],[39]]));
approx.deepEqual(multiply(d, a), matrix([[23,34]]));
approx.deepEqual(multiply(d, b), matrix([[67,78]]));
approx.deepEqual(multiply(d, c), matrix([[61]]));
approx.deepEqual(multiply([[1,2],[3,4]], [[5,6],[7,8]]), [[19,22],[43,50]]);
approx.deepEqual(multiply(range(1, 4), 2), [2, 4, 6, 8]);
assert.throws(function () {multiply(c, b)});
