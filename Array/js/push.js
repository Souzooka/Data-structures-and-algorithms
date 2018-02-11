/*
	MyArray.prototype.push
	Parameters:
		value (any): The value to append onto the array.
	Return value:
		The new length of the modified array.
	Behavior/remarks:
		Mutates an array by appending a value onto the end of it.
*/

module.exports = function push(value) {
	let idx;

	// if this.length is unable to be parsed as a number, store the value at index 0
	if (Number.isNaN(Number(this.length))) {
		idx = 0;
	} else {
		idx = this.length;
	}

	// append the new value and return the new length of the array.
	this[idx] = value;
	return this.length;
}