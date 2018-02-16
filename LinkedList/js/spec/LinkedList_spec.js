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
      assert.strictEqual(node.list, null);
    });
    it("should throw TypeError if given invalid inputs", function() {
      assert.throws(() => new LinkedListNode(9, {}), TypeError);
      assert.throws(() => new LinkedListNode(9, new LinkedListNode(1), {}), TypeError);
      assert.throws(() => new LinkedListNode(9, new LinkedListNode(1), new LinkedListNode(2), {}, TypeError);
    });
  });
  describe("LinkedListNode.isLinkedListNode", function() {
    it("should ascertain if object is LinkedListNode", function() {
      assert(!LinkedListNode.isLinkedListNode(null), "null is not a LinkedListNode");
      assert(!LinkedListNode.isLinkedListNode([]), "Array is not a LinkedListNode");
      assert(!LinkedListNode.isLinkedListNode({}), "Empty Object is not a LinkedListNode");

      assert(LinkedListNode.isLinkedListNode(new LinkedListNode(0)), "LinkedListNode is a LinkedListNode");
    })
  });
});