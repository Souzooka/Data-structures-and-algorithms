const {assert} = require("chai");
const BinaryTree = require("../BinaryTree");
const BinaryTreeNode = require("../BinaryTreeNode");

describe("BinaryTreeNode", function() {
  describe("constructor", function() {
    it("should initialize a node", function() {
      let node = new BinaryTreeNode(9);
      assert.strictEqual(node.value, 9);
      assert.strictEqual(node.left, null);
      assert.strictEqual(node.right, null);
      assert.strictEqual(node.tree, null);
    });
  });

  describe("property definitions", function() {
    it("properties should not be deletable", function() {
      let btn = new BinaryTreeNode(0);
      delete btn.value;
      delete btn.left;
      delete btn.right;
      delete btn.tree;
      assert(btn.hasOwnProperty("value"), "value was deleted");
      assert(btn.hasOwnProperty("left"), "left was deleted");
      assert(btn.hasOwnProperty("right"), "right was deleted");
      assert(btn.hasOwnProperty("tree"), "tree was deleted");
    });
  });

  describe("BinaryTreeNode.isBinaryTreeNode", function() {
    it("should ascertain if object is BinaryTreeNode", function() {
      assert(!BinaryTreeNode.isBinaryTreeNode(null), "null is not a BinaryTreeNode");
      assert(!BinaryTreeNode.isBinaryTreeNode([]), "Array is not a BinaryTreeNode");
      assert(!BinaryTreeNode.isBinaryTreeNode({}), "Empty Object is not a BinaryTreeNode");

      assert(BinaryTreeNode.isBinaryTreeNode(new BinaryTreeNode(0)), "BinaryTreeNode is a BinaryTreeNode");
    })
  });
});

describe("BinaryTree", function() {
  describe("constructor", function() {
    it("should initialize a binary tree", function() {
      let bt;
      bt = new BinaryTree();
      assert.strictEqual(bt.count, 0, "count of empty binary tree should be 0");
      assert.deepEqual(bt.root, null, "root of empty binary tree should be null");

      let btn = new BinaryTreeNode(9);
      bt = new BinaryTree(btn);
      assert.strictEqual(bt.count, 1, "count of tree with only root should be 1");
      assert.deepEqual(bt.root, {value: 9, left: null, right: null, tree: bt});
    });
    it("should throw error if constructor is not given null or a BinaryTreeNode", function() {
      assert.throws(() => new BinaryTree([]));
    });
  });

  describe("property definitions", function() {
    it("properties should not be deletable", function() {
      let bt = new BinaryTree();
      delete bt.count;
      delete bt.root;
      assert(bt.hasOwnProperty("count"), "count was deleted");
      assert(bt.hasOwnProperty("root"), "root was deleted");
    });
  });
});