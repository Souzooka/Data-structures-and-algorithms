/*
	MyArray.prototype.entries
	Parameters:
		none
	Return value:
		returns a MyArray iterator which returns the entries in the called-upon MyArray in the format
		[key, value].
*/
const MyArray = require("./MyArray");

module.exports = function entries() {
	let zippedArr = this.map((v, i) => MyArray.of(i, v));
	return zippedArr[Symbol.iterator]();
}