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

  describe("property definitions", function() {
    it("properties should not be deletable", function() {
      let lln = new LinkedListNode(0);
      delete lln.value;
      delete lln.previous;
      delete lln.next;
      delete lln.list;
      assert(lln.hasOwnProperty("value"), "value was deleted");
      assert(lln.hasOwnProperty("previous"), "previous was deleted");
      assert(lln.hasOwnProperty("next"), "next was deleted");
      assert(lln.hasOwnProperty("list"), "list was deleted");
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

  describe("property definitions", function() {
    it("properties should not be deletable", function() {
      let ll = new LinkedList();
      delete ll.count;
      delete ll.first;
      delete ll.last;
      assert(ll.hasOwnProperty("count"), "count was deleted");
      assert(ll.hasOwnProperty("first"), "first was deleted");
      assert(ll.hasOwnProperty("last"), "last was deleted");
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

  describe("LinkedList.prototype.addAfter", function() {
    it("should insert a value or node after another node in linked list", function() {
      let ll = new LinkedList(3);
      ll.addAfter(ll.first, 2);
      assert.deepEqual(ll, new LinkedList(3, 2));
      ll.addAfter(ll.first, 1);
      assert.deepEqual(ll, new LinkedList(3, 1, 2));

      ll = new LinkedList(3);
      ll.addAfter(ll.first, new LinkedListNode(2));
      assert.deepEqual(ll, new LinkedList(3, 2));
      ll.addAfter(ll.first, new LinkedListNode(1));
      assert.deepEqual(ll, new LinkedList(3, 1, 2));
    });
    it("should throw an Error if value or node is not in LinkedList", function() {
      let ll = new LinkedList(3);
      let otherll = new LinkedList(3);
      assert.throws(() => ll.addAfter(otherll.first, 2), Error);
      assert.throws(() => ll.addAfter(4, 2), Error);
    });
    it("should throw an Error if the node to add already belongs to a list", function() {
      let ll = new LinkedList(1);
      let otherll = new LinkedList(1);
      assert.throws(() => ll.addAfter(ll.first, otherll.first));
    });
  });

  describe("LinkedList.prototype.addBefore", function() {
    it("should insert a value or node before another node in linked list", function() {
      let ll = new LinkedList(3);
      ll.addBefore(ll.last, 2);
      assert.deepEqual(ll, new LinkedList(2, 3));
      ll.addBefore(ll.last, 1);
      assert.deepEqual(ll, new LinkedList(2, 1, 3));

      ll = new LinkedList(3);
      ll.addBefore(ll.last, new LinkedListNode(2));
      assert.deepEqual(ll, new LinkedList(2, 3));
      ll.addBefore(ll.last, new LinkedListNode(1));
      assert.deepEqual(ll, new LinkedList(2, 1, 3));
    });
    it("should throw an Error if value or node is not in LinkedList", function() {
      let ll = new LinkedList(3);
      let otherll = new LinkedList(3);
      assert.throws(() => ll.addBefore(otherll.first, 2), Error);
      assert.throws(() => ll.addBefore(4, 2), Error);
    });
    it("should throw an Error if the node to add already belongs to a list", function() {
      let ll = new LinkedList(1);
      let otherll = new LinkedList(1);
      assert.throws(() => ll.addBefore(ll.first, otherll.first));
    });
  });

  describe("LinkedList.prototype.addFirst", function() {
    it("should prepend a node or value onto the beginning of a list", function() {
      let ll = new LinkedList();
      ll.addFirst(new LinkedListNode(0));

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 0);
      assert.strictEqual(ll.count, 1);
      assert.deepEqual(ll.first.list, ll);

      ll.addFirst(1);

      assert.strictEqual(ll.first.value, 1);
      assert.strictEqual(ll.last.value, 0, "list.last's value should be 0 after prepending 1");
      assert.strictEqual(ll.count, 2);
      assert.equal(ll.first, ll.last.previous);
      assert.equal(ll.last, ll.first.next);

      ll.addFirst(2);

      assert.strictEqual(ll.first.value, 2);
      assert.strictEqual(ll.last.value, 0);
      assert.strictEqual(ll.first.next.value, 1);
      assert.strictEqual(ll.last.previous.value, 1);
      assert.strictEqual(ll.count, 3);
      assert.deepEqual(ll.first, ll.last.previous.previous);
      assert.deepEqual(ll.last, ll.first.next.next);
    });
    it("should throw an Error if the node to add already belongs to a list", function() {
      let ll = new LinkedList(1);
      let otherll = new LinkedList(1);
      assert.throws(() => ll.addFirst(ll.first, otherll.first));
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
    it("should throw an Error if the node to add already belongs to a list", function() {
      let ll = new LinkedList(1);
      let otherll = new LinkedList(1);
      assert.throws(() => ll.addLast(ll.first, otherll.first));
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
    it("should remove all references to the original list from the nodes contained within", function() {
      let ll = new LinkedList(0, 1, 2);
      let nodes = [ll.first, ll.first.next, ll.first.next.next];
      ll.clear();

      for (let node of nodes) {
        assert.strictEqual(node.list, null);
      }
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

  describe("LinkedList.prototype.remove", function() {
    it("should remove a node from a LinkedList", function() {
      let ll = new LinkedList(1);
      ll.remove(ll.first);
      assert.deepEqual(ll, new LinkedList());

      ll = new LinkedList(1, 2);
      ll.remove(ll.last);
      assert.deepEqual(ll, new LinkedList(1));

      ll = new LinkedList(1, 2, 3);
      ll.remove(ll.first.next);
      assert.deepEqual(ll, new LinkedList(1, 3));
    });
    it("should remove a node with value from a LinkedList", function() {
      let ll = new LinkedList(1, 2, 3);
      ll.remove(2);
      assert.deepEqual(ll, new LinkedList(1, 3));
    });
    it("should remove the reference to the original list from removed node", function() {
      let ll = new LinkedList(1, 2, 3, 4);
      let node = ll.first.next;
      ll.remove(node);
      assert.strictEqual(node.list, null);

      node = ll.last;
      ll.remove(node);
      assert.strictEqual(node.list, null);

      node = ll.first;
      ll.remove(node);
      assert.strictEqual(node.list, null);
    });
  });

  describe("LinkedList.prototype.removeFirst", function() {
    it("should not affect a list with no nodes", function() {
      let ll;
      ll = new LinkedList();
      ll.removeFirst();

      assert.strictEqual(ll.first, null);
      assert.strictEqual(ll.last, null);
      assert.strictEqual(ll.count, 0);
    });
    it("should remove the only node in a one-node list", function() {
      let ll;
      ll = new LinkedList(0);
      ll.removeFirst();

      assert.strictEqual(ll.first, null);
      assert.strictEqual(ll.last, null);
      assert.strictEqual(ll.count, 0);
    });
    it("should remove the first node in a 2+ node list", function() {
      let ll;
      ll = new LinkedList(0, 1);
      ll.removeFirst();

      assert.strictEqual(ll.first.value, 1);
      assert.strictEqual(ll.last.value, 1);
      assert.strictEqual(ll.count, 1);

      ll = new LinkedList(0, 1, 2);
      ll.removeFirst();

      assert.strictEqual(ll.first.value, 1);
      assert.strictEqual(ll.last.value, 2);
      assert.strictEqual(ll.count, 2);
    });
    it("should remove the reference to the removed node from the new head", function() {
      let ll = new LinkedList(0, 1, 2);
      ll.removeFirst();
      assert.strictEqual(ll.first.previous, null);
    });
    it("should remove the reference to the list from the removed node", function() {
      let ll = new LinkedList(1);
      let node = ll.first;
      ll.removeFirst();
      assert.strictEqual(node.list, null);
    });
  });

  describe("LinkedList.prototype.removeLast", function() {
    it("should not affect a list with no nodes", function() {
      let ll;
      ll = new LinkedList();
      ll.removeLast();

      assert.strictEqual(ll.first, null);
      assert.strictEqual(ll.last, null);
      assert.strictEqual(ll.count, 0);
    });
    it("should remove the only node in a one-node list", function() {
      let ll;
      ll = new LinkedList(0);
      ll.removeLast();

      assert.strictEqual(ll.first, null);
      assert.strictEqual(ll.last, null);
      assert.strictEqual(ll.count, 0);
    });
    it("should remove the last node in a 2+ node list", function() {
      let ll;
      ll = new LinkedList(0, 1);
      ll.removeLast();

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 0);
      assert.strictEqual(ll.count, 1);

      ll = new LinkedList(0, 1, 2);
      ll.removeLast();

      assert.strictEqual(ll.first.value, 0);
      assert.strictEqual(ll.last.value, 1);
      assert.strictEqual(ll.count, 2);
    });
    it("should remove the reference to the removed node from the new tail", function() {
      let ll = new LinkedList(0, 1, 2);
      ll.removeLast();
      assert.strictEqual(ll.last.next, null);
    });
    it("should remove the reference to the list from the removed node", function() {
      let ll = new LinkedList(1);
      let node = ll.last;
      ll.removeLast();
      assert.strictEqual(node.list, null);
    });
  });
});