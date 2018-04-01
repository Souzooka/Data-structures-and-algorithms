module.exports = function removeRight() {
  if (this.right === null) {
    return;
  }

  this.right.removeLeft();
  this.right.removeRight();

  this.right.tree = null;
  this.right = null;

  return;
}