module.exports = function peek() {
  if (this.count == 0) { throw new Error("Stack is empty."); }
  return this.__collection__[this.count - 1];
}