/*
	MyArray.prototype.unshift
	Parameters:
		([...any]): The values to prepend onto the array.
	Return value:
		The new length of the modified array.
	Behavior/remarks:
		Mutates an array by prepending value(s) onto the end of it.
		Returns the new length of the array.

		If there are no arguments given to the method,
		the length of the array is just returned instead.
*/

module.exports = function unshift() {
	// return this.length if no arguments are provided
	if (arguments.length == 0) { return this.length; }

	// shift all of the indexes in the current array to allocate room for arguments
	for (let i = this.length - 1; i >= 0; --i) {
		this[i + arguments.length] = this[i];
	}

	// assign each argument to its spot at the beginning of the array
	for (let i = 0; i < arguments.length; ++i) {
		this[i] = arguments[i];
	}

	// return the new length of the array
	return this.length;
}