/*
	MyArray.prototype.find
	Parameters:
		predicate (Function([any, [Number, [any[]]]])):
			A function used to test an element. Receives 3 arguments:
				value (any): the value of the array element
				index (Number): the index of the array element
				array (any[]): the array being called upon
		[thisArg (any)]:
			Argument that is used as context in predicate function (default this)
	Return value:
		the first element which returns true when passed to predicate,
		else undefined.
	Behavior/remarks:
		Checks each element in array until predicate returns true when passed an element,
		and returns that element.

		Returns undefined if no elements cause predicate to return true.

		Ignores holes in array.
*/

module.exports = function find(predicate, thisArg = this) {
	predicate = predicate.bind(thisArg);

	for (let idx in this) {
		if (predicate(this[idx], Number(idx), this)) {
			return this[idx];
		}
	}

	return undefined;
}