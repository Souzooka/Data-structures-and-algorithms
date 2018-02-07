module.exports = function push(value) {
	let idx;
	if (Number.isNaN(parseInt(this.length))) {
		idx = 0;
	} else {
		idx = this.length;
	}

	++this.length;
	this[idx] = value;

	return this.length;
}