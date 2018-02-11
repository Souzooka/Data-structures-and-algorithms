/*
	MyArray.prototype.shift
	Parameters:
		none
	Return value:
		The first value of the array, or
		undefined if the array is empty
	Behavior/remarks:
		Mutates the array by removing the first element and changing the index of
		the remaining elements by -1.

		Returns the element which was removed.
*/


module.exports = function shift() {
	// Hold onto the element to be removed
	let ret = this[0];

	// Change the indexes of the remaining elements
	for (let i = 0; i < this.length - 1; ++i) {
		this[i] = this[i + 1];
	}

	// Delete the last element (now duplicate of penultimate element) and reassign length
	delete this[this.length - 1];
	this.length = Math.max(this.length - 1, 0);

	// Return the removed element
	return ret;
}