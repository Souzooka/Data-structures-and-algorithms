module.exports = function unshift() {
	if (arguments.length == 0) { return this.length; }
	for (let i = this.length - 1; i >= 0; --i) {
		this[i + arguments.length] = this[i];
	}

	for (let i = 0; i < arguments.length; ++i) {
		this[i] = arguments[i];
	}
	this.length += arguments.length;

	return this.length;
}