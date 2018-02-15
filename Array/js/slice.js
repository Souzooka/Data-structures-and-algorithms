const MyArray = require("./MyArray");

module.exports = function slice(start = 0, end = this.length) {
  start = start < 0 ? Math.max(0, this.length + start) : start;
  end = end < 0 ? Math.max(0, this.length + end) : end;
  let newArr = new MyArray(Math.max(end - start, 0));
  let idx = 0;

  for (let i = start; i < end; ++i) {
    newArr[idx++] = this[i];
  }

  return newArr;
}