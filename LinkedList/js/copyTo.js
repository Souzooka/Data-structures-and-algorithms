module.exports = function copyTo(array, index = 0) {
  if (!Array.isArray(array)) {
    throw new TypeError("TypeError: First argument to copyTo must be array");
  }

  if (typeof index !== "number") {
    throw new TypeError("TypeError: Second argument to copyTo must be a number.");
  }

  if (index < 0) {
    throw new RangeError("RangeError: Second argument to copyTo must be a non-negative number.");
  }

  let curr = this.first;
  while (curr !== null) {
    array[index++] = curr.value;
    curr = curr.next;
  }

  return array;
};