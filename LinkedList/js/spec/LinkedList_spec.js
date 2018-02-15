const {assert} = require("chai");
const LinkedList = require("../LinkedList");
const LinkedListNode = require("../LinkedListNode");

describe("LinkedListNode", function() {
  describe("constructor", function() {
    it("should initialize a node", function() {
      let node = new LinkedListNode(9);
      assert.strictEqual(node.value, 9);
      assert.strictEqual(node.next, null);
      assert.strictEqual(node.previous, null);
    });
  });
});