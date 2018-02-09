module.exports = function toString(seperator = ",") {
	return "[" + this.join() + "]";
}