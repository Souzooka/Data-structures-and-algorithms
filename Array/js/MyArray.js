// Class definition and static methods

class MyArray {
	constructor(length = 0) {
		if (typeof length != "number") { throw new TypeError("MyArray's constructor was not given a number.")}
		if (length < 0) { throw new Error("MyArray's constructor was given a negative number."); }
		this.length = length;
		Object.defineProperty(this, "length", {enumerable: false});
	}
}

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

MyArray.prototype.push = require("./push");
MyArray.prototype.slice = require("./slice");

for (let prop in MyArray.prototype) {
	Object.defineProperty(MyArray.prototype, prop, {enumerable: false});
}