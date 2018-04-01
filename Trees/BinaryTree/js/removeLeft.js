module.exports = function removeLeft() {
  if (this.left === null) {
    return;
  }

  this.left.removeLeft();
  this.left.removeRight();

  this.left.tree = null;
  this.left = null;

  return;
}