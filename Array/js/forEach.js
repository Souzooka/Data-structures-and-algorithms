module.exports = function forEach(callback, thisArg = undefined) {
	callback = callback.bind(thisArg);
	for (let idx in this) {
		callback(this[idx], Number(idx), this);
	}
}