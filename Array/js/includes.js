/*
	MyArray.prototype.includes
	Parameters:
		value (any): 
			The value to search for.
		[fromIndex (Number)]: 
			The index to start searching from (default 0)
	Return value:
		true if the array contains the value (from fromIndex if provided),
		false otherwise
	Behavior/remarks:
		Performs a linear-time search on the array using `indexOf`.
		
		Not as robust or generic as Array.prototype.includes in its current state,
		as such calling it with non-array objects may cause odd behavior.
*/

module.exports = function includes(value, fromIndex = 0) {
	return this.indexOf(value, fromIndex) != -1;
}