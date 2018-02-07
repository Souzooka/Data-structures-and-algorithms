const {assert} = require("chai");
const MyArray = require("../MyArray");

describe("MyArray", function() {
	describe("constructor", function() {
		it("should initialize an empty MyArray when given no arguments", function() {
			const arr = new MyArray();
			assert.deepEqual(arr, {});
			assert.strictEqual(arr.length, 0);
		});
		it("should initialize a MyArray with given length", function() {
			const arr = new MyArray(9);
			assert.deepEqual(arr, {});
			assert.deepEqual(arr.length, 9);
		});
		it("should throw TypeError when given a non-numeric argument", function() {
			assert.throws(_ => new MyArray("X8"), TypeError);
		});
	});

	describe("MyArray.from", function() {
		it("should initialize a new MyArray when given an iterable", function() {
			assert.deepEqual(MyArray.from([1, 2, 3]), {"0": 1, "1": 2, "2": 3});
			assert.deepEqual(MyArray.from(new Set([9, 4])), {"0": 9, "1": 4});
		});
		it("should initialize a new MyArray with given length if provided with object with length property", function() {
			assert.strictEqual(MyArray.from({length: 5}).length, 5);
		});
		it("should transform an iterable if provided a function", function() {
			assert.deepEqual(MyArray.from([2, 4, 8], v => v * v), {"0": 4, "1": 16, "2": 64});
			assert.deepEqual(MyArray.from({length: 5}, (v, i) => i), {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4});
			assert.deepEqual(MyArray.from({length: 5}, (v, i, a) => a.length), {"0": 5, "1": 5, "2": 5, "3": 5, "4": 5});
		});
		it("should use the context provided", function() {
			assert.deepEqual(MyArray.from([0, 0, 0, 0], function() { return this.length; }, [1, 2, 3]), {"0": 3, "1": 3, "2": 3, "3": 3});
		});
	});
});