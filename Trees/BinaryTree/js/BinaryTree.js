const BinaryTreeNode = require("./BinaryTreeNode");

function BinaryTree(root) {
  if (!BinaryTreeNode.isBinaryTreeNode(root)) {
    root = new BinaryTreeNode(root);
  }

  if (root.left != null || root.right != null || root.tree != null)
  {
    throw new Error("root must not be part of another tree");
  }

  this.root = root;
  console.log(this.root)
  this.root.tree = this;
  this.count = 1;

  Object.defineProperty(this, "count", {configurable: false});
  Object.defineProperty(this, "root", {configurable: false});
}

BinaryTree.isBinaryTree = function isBinaryTree(bt) {
  if (bt == null) { return false; }
  if (typeof bt != "object") { return false; }

  return bt.constructor.name === "BinaryTree";
};

module.exports = BinaryTree;