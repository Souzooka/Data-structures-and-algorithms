const {assert} = require("chai");
const MyArray = require("../MyArray");

describe("MyArray", function() {
	describe("constructor", function() {
		it("should initialize an empty MyArray when given no arguments", function() {
			assert.deepEqual(new MyArray(), {});
			assert.strictEqual(new MyArray().length, 0);
		});
		it("should initialize a MyArray with given length", function() {
			const arr = new MyArray(9);
			assert.deepEqual(arr, {});
			assert.deepEqual(arr.length, 9);
		});
		it("should throw TypeError when given a non-numeric argument", function() {
			assert.throws(_ => new MyArray("X8"), TypeError, "MyArray's constructor was not given a number.");
		});
	});
});