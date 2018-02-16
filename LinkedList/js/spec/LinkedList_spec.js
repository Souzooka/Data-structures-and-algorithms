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
      assert.throws(() => new LinkedListNode(9, new LinkedListNode(1), new LinkedListNode(2), {}), TypeError);
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

describe("LinkedList", function() {
  describe("constructor", function() {
    it("should initialize a doubly-linked list", function() {
      let ll;
      ll = new LinkedList();
      assert.strictEqual(ll.count, 0, "count of empty linked list should be 0");
      assert.deepEqual(ll.first, null, "first node of empty linked list should be null");
      assert.deepEqual(ll.last, null, "last node of empty linked list should be null");

      ll = new LinkedList(0);
      assert.strictEqual(ll.count, 1, "count of linked list with 1 node should be 1");
      assert.deepEqual(ll.first.value, 0, "failure asserting ll.first.value of linked list with 1 node");
      assert.deepEqual(ll.last.value, 0, "failure asserting ll.last.value of linked list with 1 node");

      ll = new LinkedList(0, 1);
      assert.strictEqual(ll.count, 2, "count of linked list with 2 nodes should be 2");
      assert.deepEqual(ll.first.value, 0, "failure asserting ll.first.value of linked list with 2 nodes");
      assert.deepEqual(ll.last.value, 1, "failure asserting ll.last.value of linked list with 2 nodes");

      ll = new LinkedList(0, 1, 2);
      assert.strictEqual(ll.count, 3, "count of linked list with 3 nodes should be 3");
      assert.deepEqual(ll.first.value, 0, "failure asserting ll.first.value of linked list with 3 nodes");
      assert.deepEqual(ll.first.next.value, 1, "failure asserting ll.first.next.value of linked list with 3 nodes");
      assert.deepEqual(ll.first.next.next.value, 2, "failure asserting ll.first.next.next.value of linked list with 3 nodes");
      assert.deepEqual(ll.last.value, 2, "failure asserting ll.last.value of linked list with 3 nodes");
      assert.deepEqual(ll.last.previous.value, 1, "failure asserting ll.last.previous.value of linked list with 3 nodes");
      assert.deepEqual(ll.last.previous.previous.value, 0, "failure asserting ll.last.previous.previous.value of linked list with 3 nodes");
    });
  });

  describe("LinkedList.isLinkedList", function() {
    it("should ascertain if object is LinkedList", function() {
      assert(!LinkedList.isLinkedList(null), "null is not a LinkedList");
      assert(!LinkedList.isLinkedList([]), "Array is not a LinkedList");
      assert(!LinkedList.isLinkedList({}), "Empty Object is not a LinkedList");

      assert(LinkedList.isLinkedList(new LinkedList(0)), "LinkedList is a LinkedList");
    })
  });
});