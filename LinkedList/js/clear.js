module.exports = function clear() {
  for (let curr = this.first; curr !== null; curr = curr.next) {
    curr.list = null;
  }

  this.first = null;
  this.last = null;
  this.count = 0;
};