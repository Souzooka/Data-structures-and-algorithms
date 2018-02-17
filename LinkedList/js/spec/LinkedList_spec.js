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
    });
  });

  describe("LinkedList.prototype[Symbol.iterator]", function() {
    it("should return iterator/generator for linked list", function() {
      let ll = new LinkedList(0, 1, 2, 3, 4, 5);
      let i = 0;

      for (let value of ll) {
        assert.strictEqual(value, i++);
      }
    });
  });

  describe("LinkedList.prototype.addLast", function() {
    it("should append a node or value onto the end of a list", function() {
      let ll = new LinkedList();
      ll.addLast(new LinkedListNode(0));

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 0);
      assert.strictEqual(ll.count, 1);
      assert.deepEqual(ll.first.list, ll);

      ll.addLast(1);

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 1);
      assert.strictEqual(ll.count, 2);
      assert.equal(ll.first, ll.last.previous);
      assert.equal(ll.last, ll.first.next);

      ll.addLast(2);

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 2);
      assert.strictEqual(ll.first.next.value, 1);
      assert.strictEqual(ll.last.previous.value, 1);
      assert.strictEqual(ll.count, 3);
      assert.deepEqual(ll.first, ll.last.previous.previous);
      assert.deepEqual(ll.last, ll.first.next.next);
    });
  });

  describe("LinkedList.prototype.clear", function() {
    it("should mutate the list and clear it", function() {
      let ll = new LinkedList(0, 1, 2);
      ll.clear();

      assert.strictEqual(ll.first, null);
      assert.strictEqual(ll.last, null);
      assert.strictEqual(ll.count, 0);
    });
  });

  describe("LinkedList.prototype.contains", function() {
    it("should return a boolean indicating if linked list contains value", function() {
      let ll = new LinkedList("hello", null, undefined, 1, -2, Symbol.iterator);
      assert(ll.contains("hello"));
      assert(ll.contains(null));
      assert(ll.contains(undefined));
      assert(ll.contains(1));
      assert(ll.contains(-2));
      assert(ll.contains(Symbol.iterator));

      assert(!ll.contains("world"));
      assert(!ll.contains(5));
    });
  });

  describe("LinkedList.prototype.copyTo", function() {
    it("should copy the values of a linked list to an array", function() {
      let arr = [];
      let ll = new LinkedList(1, 2, 3);
      let copied = ll.copyTo(arr);

      assert.equal(copied, arr);
      assert.deepEqual(copied, [1, 2, 3]);
    });
    it("should also accept a second argument for index to insert values at", function() {
      let arr = [-999];
      let ll = new LinkedList(1, 2, 3);
      assert.deepEqual(ll.copyTo(arr, 1), [-999, 1, 2, 3]);
    });
    it("should throw errors for invalid inputs", function() {
      assert.throws(() => new LinkedList(1).copyTo(null), TypeError);
      assert.throws(() => new LinkedList(1).copyTo([], null), TypeError);
      assert.throws(() => new LinkedList(1).copyTo([], -1), RangeError);
    });
  });

  describe("LinkedList.prototype.find", function() {
    it("should find and return the first node with given value", function() {
      let ll = new LinkedList(1, 2, 3, 2, 5);
      let found = ll.find(2);
      assert.strictEqual(found.value, 2);
      assert.strictEqual(found.previous.value, 1);
      assert.strictEqual(found.next.value, 3);
    });
    it("should return null if node with value is not found", function() {
      let ll = new LinkedList(1, 2, 3, 2, 5);
      let found = ll.find(6);
      assert.strictEqual(found, null);
    });
  });

  describe("LinkedList.prototype.findLast", function() {
    it("should find and return the last node with given value", function() {
      let ll = new LinkedList(1, 2, 3, 2, 5);
      let found = ll.findLast(2);
      assert.strictEqual(found.value, 2);
      assert.strictEqual(found.previous.value, 3);
      assert.strictEqual(found.next.value, 5);
    });
    it("should return null if node with value is not found", function() {
      let ll = new LinkedList(1, 2, 3, 2, 5);
      let found = ll.findLast(6);
      assert.strictEqual(found, null);
    });
  });
});