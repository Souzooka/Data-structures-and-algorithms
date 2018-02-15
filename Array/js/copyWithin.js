module.exports = function copyWithin(target, start = 0, end = this.length) {
  target = target < 0 ? Math.max(this.length + target, 0) : Math.min(target, this.length);
  start = start < 0 ? Math.max(this.length + start, 0) : Math.min(start, this.length);
  end = end < 0 ? Math.max(this.length + end, 0) : Math.min(end, this.length);
  let copy = this.slice(start, end);

  for (let i = target; i < Math.min(target + copy.length, this.length); ++i) {
    this[i] = copy[i - target];
  }

  return this;
}