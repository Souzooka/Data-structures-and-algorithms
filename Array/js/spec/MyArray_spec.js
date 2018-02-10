const {assert} = require("chai");
const MyArray = require("../MyArray");

describe("MyArray", function() {
	describe("constructor", function() {
		it("should initialize an empty MyArray when given no arguments", function() {
			const arr = new MyArray();
			assert.strictEqual(arr.length, 0);
			for (let key in arr) {
				assert.fail();
			}
		});
		it("should initialize a MyArray with given length", function() {
			const arr = new MyArray(9);
			assert.strictEqual(arr.length, 9);
			for (let key in arr) {
				assert.fail();
			}
		});
		it("should throw TypeError when given a non-numeric argument", function() {
			assert.throws(_ => new MyArray("X8"), TypeError);
		});
	});

	describe("MyArray.from", function() {
		it("should initialize a new MyArray when given an iterable", function() {
			assert.deepEqual(MyArray.from([1, 2, 3]), {"0": 1, "1": 2, "2": 3});
			assert.deepEqual(MyArray.from(new Set([9, 4])), {"0": 9, "1": 4});
			assert.deepEqual(MyArray.from("hello"), {"0": "h", "1": "e", "2": "l", "3": "l", "4": "o"});
		});
		it("should initialize a new MyArray with given length if provided with object with length property", function() {
			assert.strictEqual(MyArray.from({length: 5}).length, 5);
		});
		it("should transform an iterable if provided a function", function() {
			assert.deepEqual(MyArray.from([2, 4, 8], v => v * v), {"0": 4, "1": 16, "2": 64});
			assert.deepEqual(MyArray.from("hello", v => String.fromCharCode(v.charCodeAt(0) + 1)), {"0": "i", "1": "f", "2": "m", "3": "m", "4": "p"});
			assert.deepEqual(MyArray.from({length: 5}, (v, i) => i), {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4});
			assert.deepEqual(MyArray.from({length: 5}, (v, i, a) => a.length), {"0": 5, "1": 5, "2": 5, "3": 5, "4": 5});
		});
		it("should use the context provided", function() {
			assert.deepEqual(MyArray.from([0, 0, 0, 0], function() { return this.length; }, [1, 2, 3]), {"0": 3, "1": 3, "2": 3, "3": 3});
		});
		it("should throw TypeError if not provided with an iterable or array-like object", function() {
			assert.throws(() => MyArray.from(9), TypeError);
			assert.throws(() => MyArray.from(null), TypeError);
			assert.throws(() => MyArray.from(), TypeError);
			assert.throws(() => MyArray.from(undefined), TypeError);
			assert.throws(() => MyArray.from({}), TypeError);
			assert.throws(() => MyArray.from({ transform: x => x }), TypeError);
		});
		it("should throw Error when not given a function as a second argument", function() {
			assert.throws(() => MyArray.from({length: 5}, {length: 5}), Error);
			assert.throws(() => MyArray.from({length: 5}, null), Error);
		});
	});

	describe("MyArray.isMyArray", function() {
		it("should return true when given MyArray", function() {
			assert(MyArray.isMyArray(new MyArray()));
			assert(MyArray.isMyArray(new MyArray(5)));
			assert(MyArray.isMyArray(MyArray.from({length: 5}, (_, i) => i)));
		});
		it("should return false when not given MyArray", function() {
			assert(!MyArray.isMyArray([]));
			assert(!MyArray.isMyArray(Object.assign({}, new MyArray())));
			assert(!MyArray.isMyArray(null));
			assert(!MyArray.isMyArray(9));
			assert(!MyArray.isMyArray("nah"));
			assert(!MyArray.isMyArray());
			assert(!MyArray.isMyArray(undefined));
		});
	});

	describe("MyArray.of", function() {
		it("should return a new MyArray with given values", function() {
			let arr;
			assert.deepEqual(MyArray.of(), new MyArray());

			arr = MyArray.of(undefined, undefined, undefined);
			assert.deepEqual(arr, {"0": undefined, "1": undefined, "2": undefined});
			assert.strictEqual(arr.length, 3);

			arr = MyArray.of(7);
			assert.deepEqual(arr, {"0": 7});
			assert.strictEqual(arr.length, 1);
		});
	});

	describe("MyArray.prototype[Symbol.iterator]", function() {
		it("should return the values of MyArray", function() {
			let arr = new MyArray();
			for (let val of MyArray.of(8, "hello", 10, true)) {
				arr.push(val);
			}
			assert.deepEqual(arr, {"0": 8, "1": "hello", "2": 10, "3": true});
		});
		it("should initialize holes in sparse MyArray", function() {
			let arr = [...new MyArray(5)];
			assert.deepEqual(arr, Array.of(undefined, undefined, undefined, undefined, undefined));
		});
	});

	describe("MyArray.prototype.concat", function() {
		it("should not mutate the array called upon", function() {
			let arr = MyArray.of(1, 2, 3);
			arr.concat(4);
			assert.deepEqual(arr, {"0": 1, "1": 2, "2": 3});
			assert.strictEqual(arr.length, 3);
		})
		it("should concatenate a value onto an array", function() {
			let arr = MyArray.of(1, 2, 3);
			arr = arr.concat(4);
			assert.deepEqual(arr, {"0": 1, "1": 2, "2": 3, "3": 4});
			assert.strictEqual(arr.length, 4);
		});
		it("should concatenate each of the values of an array passed onto an array", function() {
			let arr = MyArray.of(1);
			let arr2 = MyArray.of(2, 3, 4);
			arr = arr.concat(arr2);
			assert.deepEqual(arr, {"0": 1, "1": 2, "2": 3, "3": 4});
			assert.strictEqual(arr.length, 4);
		});
		it("should accept multiple arguments", function() {
			let arr = MyArray.of(1);
			let arr2;
			let arr3;
			arr = arr.concat(2, 3, 4);
			assert.deepEqual(arr, {"0": 1, "1": 2, "2": 3, "3": 4});
			assert.strictEqual(arr.length, 4);

			arr = MyArray.of(1);
			arr2 = MyArray.of(2, 3, 4);
			arr3 = MyArray.of(5, 6, 7);
			arr = arr.concat(arr2, arr3, 8, 9);
			assert.deepEqual(arr, {"0": 1, "1": 2, "2": 3, "3": 4, "4": 5, "5": 6, "6": 7, "7": 8, "8": 9});
			assert.strictEqual(arr.length, 9);
		});
	});

	describe("MyArray.prototype.copyWithin", function() {
		it("should insert a shallow copy of a segment of an array into an array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(-2);
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 1, 2));

			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(0, 3);
			assert.deepEqual(arr, MyArray.of(4, 5, 3, 4, 5));

			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(0, 3, 4);
			assert.deepEqual(arr, MyArray.of(4, 2, 3, 4, 5));

			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(0, -3, -2);
			assert.deepEqual(arr, MyArray.of(3, 2, 3, 4, 5));

			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(-2, -3, -2);
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 3, 5));

			arr = MyArray.of(1, 2, 3, 4, 5);
			arr.copyWithin(2, -4, -1);
			assert.deepEqual(arr, MyArray.of(1, 2, 2, 3, 4));
		});
	});

	describe("MyArray.prototype.every", function() {
		it("should return a boolean indicating if every element in an array returns true when passed to predicate", function() {
			let arr;
			arr = MyArray.of(2, 4, 6);
			assert(arr.every(v => v % 2 == 0));
			assert(!arr.every(v => v % 2 != 0));
			assert(arr.every((_, i) => i < 3));
			assert(!arr.every((_, i) => i > 3));
			assert(arr.every((_, __, a) => a.length == 3));
			assert(!arr.every((_, __, a) => a.length != 3));
		});
		it("should accept a second argument indiciating the context of the predicate", function() {
			let arr;
			arr = MyArray.of(2, 4, 6);
			assert(arr.every(function(v) { return this.length % v == 0; }, new MyArray(12)));
		});
	});

	describe("MyArray.prototype.fill", function() {
		it("should fill a MyArray with a value", function() {
			let arr;
			let modified;
			arr = new MyArray(3);
			modified = arr.fill(2);
			assert.equal(modified, arr);
			assert.deepEqual(modified, {"0": 2, "1": 2, "2": 2});
		});
		it("should fill a segment of an array if given a second and possibly third argument", function() {
			let arr;
			let modified;
			arr = new MyArray(5);
			modified = arr.fill(2, 2, 4)
			assert.equal(modified, arr);
			assert.deepEqual(modified, {"2": 2, "3": 2});

			arr = new MyArray(5);
			modified = arr.fill(2, -3, -1);
			assert.equal(modified, arr);
			assert.deepEqual(modified, {"2": 2, "3": 2});
		});
		it("should copy an object and fill an array with that new reference", function() {
			let arr;
			let modified;
			let obj = {apple: "red"};
			arr = new MyArray(2);
			arr.fill(obj);
			arr[0].apple = "blue";
			assert.strictEqual(obj.apple, "red");
			assert.strictEqual(arr[0].apple, "blue");
			assert.equal(arr[0], arr[1]);
		});
	});

	describe("MyArray.prototype.filter", function() {
		it("should filter an array based on a predicate", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4, 5, 6);
			assert.deepEqual(arr.filter(v => v % 2 == 0), MyArray.of(2, 4, 6));
			assert.deepEqual(arr.filter((_, i) => i > 3), MyArray.of(5, 6));
			assert.deepEqual(arr.filter((_, __, a) => a.length > 6), new MyArray());
			assert.deepEqual(arr.filter((_, __, a) => a.length == 6), MyArray.of(1, 2, 3, 4, 5, 6));
			assert.deepEqual(arr.filter(function(v) { return v == this.length; }), MyArray.of(6));
		});
		it("should accept a second argument that indicates the context of the passed function", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4, 5, 6);
			assert.deepEqual(arr.filter(function(v) { return v == this.length }, new MyArray(3)), MyArray.of(3));
		});
		it("should not mutate the original array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4, 5, 6);
			arr.filter(v => v % 2 == 0);
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 4, 5, 6));
		});
		it("should not process indexes that are not assigned to", function() {
			let arr = new MyArray(3);
			assert.deepEqual(arr.filter(v => v == undefined), new MyArray());
		});
	});

	describe("MyArray.prototype.flatten", function() {
		it("should not mutate the original array", function() {
			let arr = MyArray.of(1, MyArray.of(2, 3), 4);
			arr.flatten();
			assert.deepEqual(arr, MyArray.of(1, MyArray.of(2, 3), 4));
		});
		it("should flatten an array by one level", function() {
			let arr = MyArray.of(1, MyArray.of(2, 3), 4);
			arr = arr.flatten();
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 4));
			assert.strictEqual(arr.length, 4);

			arr = MyArray.of(1, MyArray.of(2, MyArray.of(3)), 4);
			arr = arr.flatten();
			assert.deepEqual(arr, MyArray.of(1, 2, MyArray.of(3), 4));
			assert.strictEqual(arr.length, 4);
		});
	});

	describe("MyArray.prototype.includes", function() {
		it("should return a boolean indicating if the array contains a value", function() {
			let arr;
			arr = MyArray.of(true, false, !true, "hello", 2, 1);
			assert(arr.includes(true));
			assert(arr.includes(false));
			assert(arr.includes("hello"));
			assert(!arr.includes("hello world!"));
			assert(!arr.includes(5));
		});
		it("should accept a second argument that indicates where to search array from", function() {
			let arr;
			arr = MyArray.of(true, false, !true, "hello", 2, 1);
			assert(arr.includes(false, 2));
			assert(arr.includes(false, -4));
			assert(!arr.includes(false, 3));
			assert(!arr.includes(false, -3));
		});
	});

	describe("MyArray.prototype.indexOf", function() {
		it("should locate the index of an element in an array", function() {
			let arr;
			arr = MyArray.of(10, 11, 12, 13, 14, 15, 16);
			assert.strictEqual(arr.indexOf(11), 1);
			assert.strictEqual(arr.indexOf(15), 5);
		});
		it("should use strict comparison", function() {
			let arr;
			arr = MyArray.of("2", 2);
			assert.strictEqual(arr.indexOf(2), 1);
		});
		it("should return -1 if element is not found", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4, 5);
			assert.strictEqual(arr.indexOf(6), -1);
		});
		it("should search from a specified point in array if given a second argument", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 2, 5);
			assert.strictEqual(arr.indexOf(2, 3), 4);
		});
		it("should calculate the index to start at from the end of array if given a negative second argument", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 2, 5);
			assert.strictEqual(arr.indexOf(2, -3), 4);
		});
		it("should search whole array if given fromIndex that is calculated to be less than 0", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4, 5);
			assert.strictEqual(arr.indexOf(0, -54), 0);
			assert.strictEqual(arr.indexOf(1, -54), 1);
		});
	});

	describe("MyArray.prototype.join", function() {
		it("should join the elements of an array into a string", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4);
			assert.strictEqual(arr.join(), "0,1,2,3,4");
		});
		it("should join the elements of an array with a custom seperator", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4);
			assert.strictEqual(arr.join(", "), "0, 1, 2, 3, 4");
		});
		it("should handle non-primitives", function() {
			let arr;
			arr = MyArray.of({}, []);
			assert.strictEqual(arr.join(), "[object Object],");
		});
		it("should properly represent a sparse array", function() {
			let arr;
			arr = new MyArray(5);
			assert.strictEqual(arr.join(), ",,,,");
		});
		it("should return empty string for empty array", function() {
			let arr;
			arr = new MyArray();
			assert.strictEqual(arr.join(), "");
		});
		it("should handle null and undefined", function() {
			let arr;
			arr = Array.from(new MyArray(2));
			arr.push(null);
			assert.strictEqual(arr.join(), ",,");
		});
	});

	describe("MyArray.prototype.lastIndexOf", function() {
		it("should locate the index of an element in an array", function() {
			let arr;
			arr = MyArray.of(10, 11, 12, 13, 14, 15, 16);
			assert.strictEqual(arr.lastIndexOf(11), 1);
			assert.strictEqual(arr.lastIndexOf(15), 5);
		});
		it("should use strict comparison", function() {
			let arr;
			arr = MyArray.of("2", 2);
			assert.strictEqual(arr.lastIndexOf(2), 1);
		});
		it("should return -1 if element is not found", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4, 5);
			assert.strictEqual(arr.lastIndexOf(6), -1);
		});
		it("should search from a specified point in array if given a second argument", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 2, 5);
			assert.strictEqual(arr.lastIndexOf(2, 3), 2);
		});
		it("should calculate the index to start at from the end of array if given a negative second argument", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 2, 5);
			assert.strictEqual(arr.lastIndexOf(2, -3), 2);
		});
		it("should return -1 if given fromIndex that is calculated to be less than 0", function() {
			let arr;
			arr = MyArray.of(0, 1, 2, 3, 4, 5);
			assert.strictEqual(arr.lastIndexOf(0, -54), -1);
			assert.strictEqual(arr.lastIndexOf(1, -54), -1);
		});
	});

	describe("MyArray.prototype.pop", function() {
		it("should return the last element of the array", function() {
			let arr;
			arr = MyArray.from([1, 2, 3, 4]);
			assert.strictEqual(arr.pop(), 4);
		});
		it("should return undefined if the array is empty", function() {
			let arr = new MyArray();
			assert.strictEqual(arr.pop(), undefined);
			assert.strictEqual(arr.length, 0);
		});
		it("should modify the original array", function() {
			let arr = MyArray.of(5, 3, 2);
			arr.pop();
			assert.deepEqual(arr, {"0": 5, "1": 3});
			assert.strictEqual(arr.length, 2);
		});
	});

	describe("MyArray.prototype.push", function() {
		it("should append a new element onto an existing array", function() {
			let arr;
			arr = new MyArray();
			arr.push(2);
			arr.push(5);
			assert.deepEqual(arr, {"0": 2, "1": 5});
			assert.strictEqual(arr.length, 2);
		});
		it("should return the new length of the array", function() {
			let arr;
			arr = new MyArray();
			arr.push(2);
			assert.strictEqual(arr.push(5), 2);
		});
	});

	describe("MyArray.prototype.reverse", function() {
		it("should reverse an array in place", function() {
			let arr;
			let reversed;

			// also initializes holes
			arr = new MyArray(3);
			reversed = arr.reverse();
			assert.equal(reversed, arr);
			assert.deepEqual(reversed, {"0": undefined, "1": undefined, "2": undefined});

			arr = MyArray.of(1, 2);
			reversed = arr.reverse();
			assert.equal(reversed, arr);
			assert.deepEqual(reversed, {"0": 2, "1": 1});

			arr = MyArray.of(1, 2, 3);
			reversed = arr.reverse();
			assert.equal(reversed, arr);
			assert.deepEqual(reversed, {"0": 3, "1": 2, "2": 1});
		});
	});

	describe("MyArray.prototype.shift", function() {
		it("should return the first element of an array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3);
			assert.strictEqual(arr.shift(), 1);
		});
		it("should return undefined for empty array", function() {
			let arr;
			arr = new MyArray();
			assert.strictEqual(arr.shift(), undefined);
			assert.strictEqual(arr.length, 0);
		});
		it("should mutate the original array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3);
			assert.strictEqual(arr.shift(), 1);
			assert.strictEqual(arr.length, 2);
			assert.deepEqual(arr, MyArray.of(2, 3));
		});
	});

	describe("MyArray.prototype.slice", function() {
		it("should return a segment of the original array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4);
			assert.deepEqual(arr.slice(0, 2), {"0": 1, "1": 2});
			assert.deepEqual(arr.slice(-2), {"0": 3, "1": 4});
			assert.deepEqual(arr.slice(-2, 1), new MyArray());
			assert.deepEqual(arr.slice(-2, -1), {"0": 3});
			assert.deepEqual(arr.slice(3, 0), new MyArray());
			assert.deepEqual(arr.slice(), arr);
			assert.deepEqual(arr.slice(0), arr);
			assert.deepEqual(arr.slice(0, arr.length), arr);
		});
		it("should not mutate the original array", function() {
			let arr;
			arr = MyArray.of(1, 2, 3, 4);
			arr.slice();
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 4));
		});
	});

	describe("MyArray.prototype.some", function() {
		it("should return a boolean indicating if any elements in array matches the passed predicate", function() {
			let arr;
			arr = MyArray.of(false, false, false);
			assert(!arr.some(v => v));
			arr = MyArray.of(false, false, true);
			assert(arr.some(v => v));
			arr = MyArray.of(0, 0, 0);
			assert(arr.some((_, i) => i == 2));
			assert(!arr.some((_, i) => i == 3));
			arr = MyArray.of(1, 2, 3);
			assert(arr.some((v, _, a) => a.includes(v)));
			assert(!arr.some((v, _, a) => a.includes(v + 3)));
		});
		it("should accept a second argument indicating the context of the predicate", function() {
			let arr;
			arr = MyArray.of(4, 5, 6);
			assert(arr.some(function(v) { return v == this.length; }, new MyArray(5)));
		});
	});

	describe("MyArray.prototype.toString", function() {
		it("should return a string representation of an array", function() {
			assert.strictEqual(MyArray.of(undefined, null, 2, 3, "hello").toString(), "[,,2,3,hello]");
		});
	});

	describe("MyArray.prototype.unshift", function() {
		it("should return the new length of the array", function() {
			let arr = MyArray.of(2, 3, 4, 5, 6);
			assert.strictEqual(6, arr.unshift(1));
		});
		it("should prepend an element onto an array", function() {
			let arr = MyArray.of(2, 3, 4, 5, 6);
			arr.unshift(1);
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 4, 5, 6));
		});
		it("should prepend all arguments given onto an array", function() {
			let arr = MyArray.of(4, 5, 6);
			assert.strictEqual(arr.unshift(1, 2, 3), 6);
			assert.deepEqual(arr, MyArray.of(1, 2, 3, 4, 5, 6));
		});
	});
});