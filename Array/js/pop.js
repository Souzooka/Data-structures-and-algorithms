module.exports = function pop(value) {
	if (this.length <= 0) { return undefined; }
	let ret = this[this.length - 1];
	delete this[this.length - 1];
	--this.length;
	return ret;
}