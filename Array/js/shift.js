module.exports = function shift() {
	let ret = this[0];

	for (let i = 0; i < this.length - 1; ++i) {
		this[i] = this[i + 1];
	}

	delete this[this.length - 1];
	this.length = Math.max(this.length - 1, 0);
	return ret;
}