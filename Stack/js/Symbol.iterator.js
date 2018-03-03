module.exports = function() {
  return this.__collection__[Symbol.iterator]();
}