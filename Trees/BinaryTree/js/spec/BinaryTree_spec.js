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
    });
  });

  describe("BinaryTreeNode.prototype.AddLeft", function() {
    it("should add a node to the tree", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      bt.root.AddLeft(new BinaryTreeNode(1));
      assert.deepEqual(bt.root.left, {value: 1, left: null, right: null, tree: bt});
    });
    it("should return a reference to the new node", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      assert.deepEqual(bt.root.AddLeft(new BinaryTreeNode(1)), {value: 1, left: null, right: null, tree: bt});
    });
    it("should make a new node with passed value if not BinaryTreeNode", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      bt.root.AddLeft(1);
      assert.deepEqual(bt.root.left, {value: 1, left: null, right: null, tree: bt});
    });
  });
});

describe("BinaryTree", function() {
  describe("constructor", function() {
    it("should initialize a binary tree", function() {
      let bt;
      bt = new BinaryTree();
      assert.strictEqual(bt.count, 1);
      assert.deepEqual(bt.root, {value: undefined, left: null, right: null, tree: bt});

      let btn = new BinaryTreeNode(9);
      bt = new BinaryTree(btn);
      assert.strictEqual(bt.count, 1, "count of tree with only root should be 1");
      assert.deepEqual(bt.root, {value: 9, left: null, right: null, tree: bt});
    });
    it("should make a new node out of of passed value for root if not BinaryTreeNode", function() {
      let bt = new BinaryTree([]);
      assert.deepEqual(bt.root, {value: [], left: null, right: null, tree: bt});

      bt = new BinaryTree();
      assert.deepEqual(bt.root, {value: undefined, left: null, right: null, tree: bt});
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