// collection of array sorting algorithms

const sortFns = {
	"quickSort": require("./quickSort") // not in-place, (O(n * log(n)), O(n * log(n)), O(n^2) performance)
};

module.exports = function sort(comparisonFn = (a, b) => a.toString().localeCompare(b.toString()), sortType = "quickSort") {
	if (typeof comparisonFn != "function") {
		throw new TypeError("TypeError: First argument to MyArray.prototype.sort was not a function");
	}

	if (!sortFns.hasOwnProperty(sortType)) {
		throw new Error("Error: invalid sorting algorithm");
	}

	return sortFns[sortType].call(this, comparisonFn);
};