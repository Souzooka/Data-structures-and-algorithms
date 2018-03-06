const {assert} = require("chai");
const Queue = require("../Queue");
const LinkedList = require("../../../LinkedList/js/LinkedList.js");

describe("Queue", function() {
  describe("constructor", function() {
    it("should initialize an empty queue given no arguments", function() {
      let queue = new Queue();

      assert.strictEqual(queue.count, 0);
    });
    it("should initialize a queue with data contained in enumerable if it is given as first argument", function() {
      let queue = new Queue([1, 2, 3, 4]);
      assert.strictEqual(queue.count, 4);
      assert.deepEqual(queue.__collection__, new LinkedList(1, 2, 3, 4));

      queue = new Queue(new Set([1, 2, 3, 4]));
      assert.strictEqual(queue.count, 4);
      assert.deepEqual(queue.__collection__, new LinkedList(1, 2, 3, 4));
    });
    it("should initialize an empty queue if given a non-enumerable first argument", function() {
      assert.deepEqual(new Queue(1), new Queue());
      assert.deepEqual(new Queue(null), new Queue());
      assert.deepEqual(new Queue({0: "1", 1: 2}), new Queue());
      assert.deepEqual(new Queue(NaN), new Queue());
    });
  });

  describe("properties", function() {
    it("count should not be deletable", function() {
      let queue = new Queue();
      delete queue.count;
      assert.strictEqual(queue.count, 0);
    });
    it("count should not be overwritable", function() {
      let queue = new Queue();
      queue.count = 2;
      assert.strictEqual(queue.count, 0);
    });
    it("__collection__ should not be deletable", function() {
      let queue = new Queue();
      delete queue.__collection__;
      assert.deepEqual(queue.__collection__, new LinkedList());
    });
    it("__collection__ should not be overwritable", function() {
      let queue = new Queue();
      queue.__collection__ = 9;
      assert.deepEqual(queue.__collection__, new LinkedList());
    });
  });

  describe("Queue.prototype.clear", function() {
    it("should clear all items from a queue", function() {
      let queue = new Queue([1, 2, 3, 4]);
      queue.clear();
      assert.strictEqual(queue.count, 0);
      assert.deepEqual(queue.__collection__, new LinkedList());
    });
  });

  describe("Queue.prototype.peek", function() {
    it("should return the item at top of queue without modifying queue", function() {
      let queue = new Queue([1, 2, 3]);
      assert.strictEqual(queue.peek(), 3);
      assert.strictEqual(queue.count, 3);
      assert.deepEqual(queue, new Queue([1, 2, 3]));
    });
    it("should throw error if queue is empty", function() {
      let queue = new Queue();
      assert.throws(() => queue.peek());
    });
  });
});