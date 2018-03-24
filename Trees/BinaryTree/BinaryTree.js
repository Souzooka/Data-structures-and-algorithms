const BinaryTreeNode = require("./BinaryTreeNode");

function BinaryTree(root = null) {
  if (!BinaryTreeNode.isBinaryTreeNode(root) && root != null) {
    console.log(root);

  }

  this.count = (root == null ? 0 : 1);
  this.root = root;

  Object.defineProperty(this, "count", {configurable: false});
  Object.defineProperty(this, "root", {configurable: false});
}

BinaryTree.isBinaryTree = function isBinaryTree(bt) {
  if (bt == null) { return false; }
  if (typeof bt != "object") { return false; }

  return bt.constructor.name === "BinaryTree";
};

module.exports = BinaryTree;