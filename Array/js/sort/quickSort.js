const MyArray = require("../MyArray");
module.exports = function quickSort(comparisonFn) {
	if (this.length <= 1) { return this; }

	let	pivot = MyArray.of(this[0]),
		high = new MyArray(),
		low = new MyArray();

	for (let i = 1; i < this.length; ++i) {
		let result = comparisonFn(this[i], pivot[0])
		if (result == 0) { pivot.push(this[i]); }
		else if (result > 0) { high.push(this[i]); }
		else if (result < 0) { low.push(this[i]); }
	}

	return quickSort.call(low, comparisonFn).concat(pivot, quickSort.call(high, comparisonFn));
};