module.exports = function every(predicate, thisArg = this) {
	predicate = predicate.bind(thisArg);

	for (let idx in this) {
		if (!predicate(this[idx], Number(idx), this)) {
			return false;
		}
	}

	return true;
}