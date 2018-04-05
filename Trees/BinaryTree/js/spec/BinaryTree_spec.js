const {assert} = require("chai");
const BinaryTree = require("../BinaryTree");
const BinaryTreeNode = require("../BinaryTreeNode");

// Generates a perfect tree, for testing purposes
function generateBinaryTree(depth) {
  if (typeof depth != "number" || depth < 1) {
    throw new Error();
  } 

  let bt = new BinaryTree();
  let curr = [bt.root];
  let prev = [];

  for (let i = 1; i < depth; ++i) {
    prev = curr;
    curr = [];

    prev.forEach(node => {
      curr.push(node.addLeft());
      curr.push(node.addRight());
    });
  }

  return bt;
}

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
      bt.root.addLeft(new BinaryTreeNode(1));
      assert.strictEqual(bt.root.left.value, 1);
      assert.strictEqual(bt.root.left.left, null);
      assert.strictEqual(bt.root.left.right, null);
      assert.deepEqual(bt.root.left.tree, bt);
    });
    it("should return a reference to the new node", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      let btn = bt.root.addLeft(new BinaryTreeNode(1));
      assert.deepEqual(btn, bt.root.left);
    });
    it("should make a new node with passed value if not BinaryTreeNode", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      bt.root.addLeft(1);
      assert.strictEqual(bt.root.left.value, 1);
    });
  });

  describe("BinaryTreeNode.prototype.AddLeft", function() {
    it("should add a node to the tree", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      bt.root.addRight(new BinaryTreeNode(1));
      assert.strictEqual(bt.root.right.value, 1);
      assert.strictEqual(bt.root.right.left, null);
      assert.strictEqual(bt.root.right.right, null);
      assert.deepEqual(bt.root.right.tree, bt);
    });
    it("should return a reference to the new node", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      let btn = bt.root.addRight(new BinaryTreeNode(1));
      assert.deepEqual(btn, bt.root.right);
    });
    it("should make a new node with passed value if not BinaryTreeNode", function() {
      let bt = new BinaryTree(new BinaryTreeNode(0));
      bt.root.addRight(1);
      assert.strictEqual(bt.root.right.value, 1);
    });
  });
});

describe("BinaryTree", function() {
  describe("constructor", function() {
    it("should initialize a binary tree", function() {
      let bt;
      bt = new BinaryTree();
      assert.strictEqual(bt.count, 1);
      assert.deepEqual(bt.root.value, undefined);
      assert.deepEqual(bt.root.left, null);
      assert.deepEqual(bt.root.right, null);
      assert.deepEqual(bt.root.tree, bt);

      let btn = new BinaryTreeNode(9);
      bt = new BinaryTree(btn);
      assert.strictEqual(bt.count, 1, "count of tree with only root should be 1");
      assert.deepEqual(bt.root.value, 9);
      assert.deepEqual(bt.root.left, null);
      assert.deepEqual(bt.root.right, null);
      assert.deepEqual(bt.root.tree, bt);
    });
    it("should make a new node out of of passed value for root if not BinaryTreeNode", function() {
      let bt = new BinaryTree([]);
      assert.deepEqual(bt.root.value, []);
      assert.deepEqual(bt.root.left, null);
      assert.deepEqual(bt.root.right, null);
      assert.deepEqual(bt.root.tree, bt);

      bt = new BinaryTree();
      assert.deepEqual(bt.root.value, undefined);
      assert.deepEqual(bt.root.left, null);
      assert.deepEqual(bt.root.right, null);
      assert.deepEqual(bt.root.tree, bt);
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