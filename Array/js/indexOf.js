module.exports = function indexOf(toSearch, fromIndex = 0) {
  fromIndex = fromIndex < 0 ? Math.max(this.length + fromIndex, 0) : fromIndex;

  for (let i = fromIndex; i < this.length; ++i) {
    if (this[i] === toSearch) {
      return i;
    }
  }

  return -1;
}