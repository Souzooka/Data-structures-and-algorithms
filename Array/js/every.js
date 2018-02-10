module.exports = function every(predicate, thisArg = this) {
	predicate = predicate.bind(thisArg);

	for (let idx in this) {
		if (!predicate(this[idx], idx, this)) {
			return false;
		}
	}

	return true;
}