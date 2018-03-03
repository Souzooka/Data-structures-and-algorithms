module.exports = function copyTo(array, idx) {
  if (!Array.isArray(array)) {
    throw new Error("first argument to copyTo must be array");
  }
  if (typeof idx != "number") {
    throw new TypeError("second argument to copyTo must be a number");
  }
  if (idx < 0) {
    throw new Error("second argument to copyTo must be non-negative number");
  }

  for (let value of this) {
    array[idx++] = value;
  }
}