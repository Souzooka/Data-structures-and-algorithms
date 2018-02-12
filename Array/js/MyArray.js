// Class definition and static methods

// proxy handler for MyArray
const MyArrayhandler = {
	set: function(target, property, value) {

		// Logic for setting length
		if (property == "length") {
			if (value < MyArray.__minLength || MyArray.__maxLength < value || typeof value != "number" || value % 1 != 0) {
				throw new RangeError("Invalid MyArray length");
			}

			// truncate array if necessary
			if (value < target.length) {

				// special handler for popping values so that it is not linear time
				if (value == target.length - 1) {
					delete target[target.length - 1];
				} else {
					// delete any keys equal to or greater than the new length
					for (let key in target) {
						if (Number(key) >= value) {
							delete target[key];
						}
					}
				}
			}
			target[property] = value;
			return;
		}

		// Update length if numeric property is set
		target[property] = value;
		let idx = Number(property)
		if (!Number.isNaN(idx) && idx >= target.length && MyArray.__minLength <= idx && idx < MyArray.__maxLength) {
			target.length = Number(property) + 1;
		}
	}
}

function MyArray(length = 0) {
	// if constructor is called without "new"
	if (!(this instanceof MyArray)) {
		return new MyArray(length);
	}

	if (typeof length != "number") { throw new TypeError("MyArray's constructor was not given a number.")}
	if (length < 0) { throw new Error("MyArray's constructor was given a negative number."); }

	this.length = length;
	Object.defineProperty(this, "length", {enumerable: false, configurable: false});
	return new Proxy(this, MyArrayhandler);
}

// Acceptable range for the length of a MyArray;
MyArray.__maxLength = Math.pow(2, 32) - 1;
MyArray.__minLength = 0;
Object.defineProperty(MyArray, "__maxLength", {enumerable: false, configurable: false, writable: false});
Object.defineProperty(MyArray, "__minLength", {enumerable: false, configurable: false, writable: false});

MyArray.from = function(iterable, transform = x => x, context = iterable) {
	transform = transform.bind(context);

	let isIterable = true,
		arrayLike = false,
		length = 0;

	if (iterable == null || typeof iterable[Symbol.iterator] != "function") {
		isIterable = false;
	}
	if (Object.prototype.hasOwnProperty.call(iterable, "length")) {
		arrayLike = true;
		length = iterable.length;
	}
	if (!isIterable && !arrayLike) {
		throw new TypeError("MyArray.from was not given an iterable or arrayLike object. Name: iterable");
	}
	if (typeof transform != "function") { 
		throw new TypeError("MyArray.from was not given a function. Name: transform"); 
	}

	const ret = new MyArray(length);
	let idx = 0;

	if (isIterable) {
		for (let value of iterable) {
			ret[idx] = transform(value, idx++, iterable);
		}
	} else {
		for (let i = 0; i < length; ++i) {
			ret[idx] = transform(undefined, idx++, iterable);
		}
	}

	return ret;
}

// Note: JavaScript typing is weird, to no one's surprise.
// Native isArray relies on Object.prototype.toString,
// but here's my own hack instead.
MyArray.isMyArray = function(myArray) {
	if (myArray == null) { return false; }
	if (myArray == undefined) { return false; }
	if (typeof myArray != "object") { return false; }

	return myArray.constructor.name === "MyArray";
}

MyArray.of = function() {
	const ret = new MyArray(arguments.length);

	for (let i = 0; i < arguments.length; ++i) {
		ret[i] = arguments[i];
	}

	return ret;
}

module.exports = MyArray;

// prototype methods
MyArray.prototype[Symbol.iterator] = require("./Symbol.iterator");
MyArray.prototype.concat = require("./concat");
MyArray.prototype.copyWithin = require("./copyWithin");
MyArray.prototype.entries = require("./entries");
MyArray.prototype.every = require("./every");
MyArray.prototype.fill = require("./fill");
MyArray.prototype.filter = require("./filter");
MyArray.prototype.find = require("./find");
MyArray.prototype.findIndex = require("./findIndex");
MyArray.prototype.flatten = require("./flatten");
MyArray.prototype.forEach = require("./forEach");
MyArray.prototype.indexOf = require("./indexOf");
MyArray.prototype.includes = require("./includes");
MyArray.prototype.join = require("./join");
MyArray.prototype.keys = require("./keys");
MyArray.prototype.lastIndexOf = require("./lastIndexOf");
MyArray.prototype.map = require("./map");
MyArray.prototype.pop = require("./pop");
MyArray.prototype.push = require("./push");
MyArray.prototype.reverse = require("./reverse");
MyArray.prototype.shift = require("./shift");
MyArray.prototype.slice = require("./slice");
MyArray.prototype.some = require("./some");
MyArray.prototype.toString = require("./toString");
MyArray.prototype.unshift = require("./unshift");

for (let prop in MyArray.prototype) {
	Object.defineProperty(MyArray.prototype, prop, {enumerable: false});
}