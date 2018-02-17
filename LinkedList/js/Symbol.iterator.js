module.exports = function*() {
  for (let curr = this.first; curr !== null; curr = curr.next) {
    yield curr.value;
  }
};