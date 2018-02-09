module.exports = function includes(value, fromIndex = 0) {
	return this.indexOf(value, fromIndex) != -1;
}