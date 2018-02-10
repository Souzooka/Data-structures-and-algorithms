const MyArray = require("./MyArray");

module.exports = function filter(predicate, thisArg = this) {
	const newArr = new MyArray();
	predicate = predicate.bind(thisArg);

	for (let idx in this) {
		if (predicate(this[idx], idx, this)) {
			newArr.push(this[idx]);
		}
	}

	return newArr;
}