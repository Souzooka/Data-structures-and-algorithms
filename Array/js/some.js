module.exports = function some(predicate, thisArg = this) {
	predicate = predicate.bind(thisArg);

	for (let i = 0; i < this.length; ++i) {
		if (this.hasOwnProperty(i) && predicate(this[i], i, this)) {
			return true;
		}
	}

	return false;
}