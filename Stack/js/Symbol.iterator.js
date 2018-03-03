module.exports = function*() {
  for (let i = this.count - 1; i >= 0; --i) {
    yield this.__collection__[i];
  }
}