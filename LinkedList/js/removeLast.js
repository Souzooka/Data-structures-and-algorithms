module.exports = function removeLast() {
  if (this.last === null) { return; }

  --this.count;
  if (this.first === this.last) { this.first = null; }
  this.last.list = null;
  this.last = this.last.previous;
  if (this.last !== null) { this.last.next = null; }
};