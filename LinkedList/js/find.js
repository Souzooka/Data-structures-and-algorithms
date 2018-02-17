module.exports = function find(value) {
  for (let curr = this.first; curr !== null; curr = curr.next) {
    if (curr.value === value) { return curr; }
  }

  return null;
};