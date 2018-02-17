module.exports = function findLast(value) {
  for (let curr = this.last; curr !== null; curr = curr.previous) {
    if (curr.value === value) { return curr; }
  }

  return null;
};