module.exports = function pop() {
  if (this.count == 0) { throw new Error("Stack is empty."); }
  return this.__collection__.pop();
}