/*
	MyArray.prototype.reduce
	Parameters:
		accFn (Function([any, [any, [Number, [any[]]]]])):
			A function used to test an element. Receives 4 arguments:
				acc (any): the current accumulator value
				current (any): the current array element
				index (Number): the index of the array element
				array (any[]): the array being called upon
		[initialSeed (any)]:
			Argument that is used as context in predicate function (default this)
	Return value:
		The result of the accumulator function being run against each element in an array,
		left to right.
	Behavior/remarks:
		Throws TypeError if reduce is called on an empty array without an
		initialSeed argument being passed.

		Throws TypeError if the first argument is not a function.
*/

module.exports = function reduce(accFn, initialSeed) {
	let i;
	let seed;
	let keys = Object.keys(this);

	// check that accFn is function
	if (typeof accFn != "function") {
		throw new TypeError("TypeError: Reduce was not given a function.");
	}

	// check if initialSeed was given as an argument
	if (arguments.length >= 2) {
		i = 0;
		seed = initialSeed;
	} else {
		if (keys.length == 0) {
			throw new TypeError("TypeError: Reduce of empty array with no initial value");
		}
		i = 1;
		seed = this[keys[0]];
	}

	// apply the accumulator function against each element in the called-upon array
	for (; i < keys.length; ++i) {
		seed = accFn(seed, this[keys[i]], Number(keys[i]), this);
	}

	return seed;
}