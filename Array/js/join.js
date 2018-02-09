module.exports = function join(seperator = ",") {
	if (this.length == 0) { return ""; }
	let retStr = "" + (this[0] == undefined || this[0] == null ? "" : this[0]);

	for (let i = 1; i < this.length; ++i) {
		retStr += seperator;
		retStr += (this[i] == undefined || this[i] == null ? "" : this[i]);
	}

	return retStr;
}