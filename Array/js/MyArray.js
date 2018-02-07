// Class definition and static methods

class MyArray {
	constructor(length = 0) {
		if (typeof length != "number") { throw new TypeError("MyArray's constructor was not given a number.")}
		this.length = length;
		Object.defineProperty(this, "length", {enumerable: false});
	}
}

MyArray.from = function(iterable, transform = x => x, context = iterable) {
	if (iterable == null || typeof iterable[Symbol.iterator] != "function") {
		throw new TypeError("MyArray.from was not given an iterable object.");
	}

	const ret = new MyArray();
	let idx = 0;

	for (let value of iterable) {
		ret.push(transform.call(context, value, idx++, iterable));
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
	const ret = new MyArray();

	for (let i = 0; i < arguments.length; ++i) {
		ret.push(arguments[i]);
	}

	return ret;
}

MyArray.prototype.push = require("./push");

for (let prop in MyArray.prototype) {
	Object.defineProperty(MyArray.prototype, prop, {enumerable: false});
}

module.exports = MyArray;