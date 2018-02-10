const MyArray = require("./MyArray");

module.exports = function map(transfromFn, thisArg = this) {
	const newArr = new MyArray();
	transfromFn = transfromFn.bind(thisArg);

	for (let idx in this) {
		const transformed = transfromFn(this[idx], Number(idx), this);
		newArr.push(transformed);
	}

	return newArr;
}