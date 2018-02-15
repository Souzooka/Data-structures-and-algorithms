/*
  MyArray.prototype.keys
  Parameters:
    none
  Return value:
    returns a MyArray iterator which returns the integral keys in a MyArray.
  Behavior/remarks:
    Ignores holes in a sparse array.
*/
const MyArray = require("./MyArray");

module.exports = function keys() {
  return (function*() {
    for (let i = 0; i < this.length; ++i) {
      yield i;
    }
  }).call(this);
}