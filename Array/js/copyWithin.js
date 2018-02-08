const MyArray = require("./MyArray");

module.exports = function copyWithin(target, start = 0, end = this.length) {
	target = target < 0 ? Math.max(this.length - target, 0) : Math.min(target, this.length);
	start = start < 0 ? Math.max(this.length - start, 0) : Math.min(start, this.length);
	end = end < 0 ? Math.max(this.length - end, 0) : Math.min(end, this.length);
	let buf = new MyArray(end - start);

	// TODO
}