module.exports = function peek() {
  if (this.count == 0) { throw new Error("Queue is empty."); }
  return this.__collection__.last.value;
}