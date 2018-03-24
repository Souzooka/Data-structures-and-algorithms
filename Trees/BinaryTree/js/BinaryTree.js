const BinaryTreeNode = require("./BinaryTreeNode");

function BinaryTree(root = null) {
  if (!BinaryTreeNode.isBinaryTreeNode(root) && root != null) {
    throw new TypeError("root must be BinaryTreeNode");
  }

  this.count = 0
  this.root = root;

  if (root != null)
  {
    if (root.left != null || root.right != null || root.tree != null)
    {
      throw new Error("root must not be part of another tree");
    }

    this.root.tree = this;
    this.count = 1;
  }

  Object.defineProperty(this, "count", {configurable: false});
  Object.defineProperty(this, "root", {configurable: false});
}

BinaryTree.isBinaryTree = function isBinaryTree(bt) {
  if (bt == null) { return false; }
  if (typeof bt != "object") { return false; }

  return bt.constructor.name === "BinaryTree";
};

module.exports = BinaryTree;