module.exports = function some(predicate, thisArg = this) {
	predicate = predicate.bind(thisArg);

	for (let idx in this) {
		if (predicate(this[idx], idx, this)) {
			return true;
		}
	}

	return false;
}