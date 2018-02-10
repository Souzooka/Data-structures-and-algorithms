const MyArray = require("./MyArray");

module.exports = function filter(predicate, thisArg = this) {
	const newArr = new MyArray();
	predicate = predicate.bind(thisArg);

	for (let i = 0; i < this.length; ++i) {
		if (this.hasOwnProperty(i) && predicate(this[i], i, this)) {
			newArr.push(this[i]);
		}
	}

	return newArr;
}