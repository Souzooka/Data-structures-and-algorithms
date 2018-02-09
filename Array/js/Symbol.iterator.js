module.exports = function*() {
	for (let key in this) {
		yield this[key];
	}
}