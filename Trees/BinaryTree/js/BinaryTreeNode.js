function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.tree = null;

  Object.defineProperty(this, "value", {configurable: false});
  Object.defineProperty(this, "left", {configurable: false});
  Object.defineProperty(this, "right", {configurable: false});
  Object.defineProperty(this, "tree", {configurable: false});
}

BinaryTreeNode.isBinaryTreeNode = function isBinaryTreeNode(node) {
  if (node == null) { return false; }
  if (typeof node != "object") { return false; }

  return node.constructor.name === "BinaryTreeNode";
};

module.exports = BinaryTreeNode;

BinaryTreeNode.prototype.addLeft = require("./addLeft");
BinaryTreeNode.prototype.addRight = require("./addRight");