module.exports = function lastIndexOf(toSearch, fromIndex = this.length - 1) {
  fromIndex = fromIndex < 0 ? this.length + fromIndex : fromIndex;
  if (fromIndex < 0) { return - 1; }

  for (let i = fromIndex; i >= 0; --i) {
    if (this[i] === toSearch) {
      return i;
    }
  }

  return -1;
}