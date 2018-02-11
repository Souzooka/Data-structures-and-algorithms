/*
	MyArray.prototype.pop
	Parameters:
		none
	Return value:
		The value at the end of the array, or undefined if length is 0
	Behavior/remarks:
		Mutates an array by removing the value at the end of the array.
*/

module.exports = function pop() {

	// return undefined in case property "-1" is defined.
	if (this.length === 0) { return undefined; }

	// store value to return and delete the property on the array.
	let ret = this[this.length - 1];
	delete this[this.length - 1];
	--this.length;
	return ret;
}