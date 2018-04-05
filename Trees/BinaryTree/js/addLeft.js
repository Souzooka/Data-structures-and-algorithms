const BinaryTreeNode = require("./BinaryTreeNode");

module.exports = function addLeft(node) {
  if (this.left != null) {
    throw new Error("There is already a node on the left.")
  }

  if (!BinaryTreeNode.isBinaryTreeNode(node)) {
    node = new BinaryTreeNode(node);
  }

  if (node.tree != null || node.left != null || node.right != null) {
    throw new Error("node already belongs to tree");
  }

  ++this.tree.count;
  node.tree = this.tree;
  this.left = node;

  return node;
}