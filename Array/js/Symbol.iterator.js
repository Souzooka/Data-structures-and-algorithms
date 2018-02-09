module.exports = function*() {
	for (let i = 0; i < this.length; ++i) {
		if (!this.hasOwnProperty(i)) { this[i] = undefined; }
		yield this[i];
	}
}