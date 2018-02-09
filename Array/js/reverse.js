module.exports = function reverse() {
	for (let i = 0; i < this.length / 2; ++i) {
		let temp = this[i];
		this[i] = this[this.length - i - 1];
		this[this.length - i - 1] = temp;
	}

	return this;
}