module.exports = function removeFirst() {
  if (this.first === null) { return; }

  --this.count;
  if (this.first === this.last) { this.last = null; }
  this.first = this.first.next;
};