// not part of EcmaScript specifications, this one is on me.
// flattens a MyArray by one level.
const MyArray = require("./MyArray");

module.exports = function flatten() {
  return new MyArray().concat.apply(new MyArray(), this);
}