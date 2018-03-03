const {assert} = require("chai");
const Stack = require("../Stack");

describe("Stack", function() {
  describe("constructor", function() {
    it("should initialize an empty stack given no arguments", function() {
      let stack = new Stack();

      assert.strictEqual(stack.count, 0);
    });
    it("should initialize a stack with data contained in enumerable if it is given as first argument", function() {
      let stack = new Stack([1, 2, 3, 4]);
      assert.strictEqual(stack.count, 4);
      assert.deepEqual(stack.__collection__, [1, 2, 3, 4]);

      stack = new Stack(new Set([1, 2, 3, 4]));
      assert.strictEqual(stack.count, 4);
      assert.deepEqual(stack.__collection__, [1, 2, 3, 4]);
    });
    it("should initialize an empty stack if given a non-enumerable first argument", function() {
      assert.deepEqual(new Stack(1), new Stack());
      assert.deepEqual(new Stack(null), new Stack());
      assert.deepEqual(new Stack({0: "1", 1: 2}), new Stack());
      assert.deepEqual(new Stack(NaN), new Stack());
    });
  });

  describe("properties", function() {
    it("count should not be deletable", function() {
      let stack = new Stack();
      delete stack.count;
      assert.strictEqual(stack.count, 0);
    });
    it("count should not be overwritable", function() {
      let stack = new Stack();
      stack.count = 2;
      assert.strictEqual(stack.count, 0);
    });
    it("__collection__ should not be deletable", function() {
      let stack = new Stack();
      delete stack.__collection__;
      assert.deepEqual(stack.__collection__, []);
    });
    it("__collection__ should not be overwritable", function() {
      let stack = new Stack();
      stack.__collection__ = 9;
      assert.deepEqual(stack.__collection__, []);
    });
  });

  describe("Stack.prototype[Symbol.iterator]", function() {
    it("should iterate over all of the items in stack", function() {
      let stack = new Stack([0, 1, 2, 3]);
      let i = 0;

      for (let item of stack) {
        assert.strictEqual(item, i);
        ++i;
      }
    });
  });

  describe("Stack.prototype.clear", function() {
    it("should clear all items from a stack", function() {
      let stack = new Stack([1, 2, 3, 4]);
      stack.clear();
      assert.strictEqual(stack.count, 0);
      assert.deepEqual(stack.__collection__, []);
    });
  });

  describe("Stack.prototype.contains", function() {
    it("return true if stack contains item", function() {
      let stack = new Stack([1, 2, 3, 4]);
      assert(stack.contains(1));
      assert(stack.contains(2));
      assert(stack.contains(3));
      assert(stack.contains(4));
    });
    it("return true if stack does not contain item", function() {
      let stack = new Stack([1, 2, 3, 4]);
      assert(!stack.contains(5));
      assert(!stack.contains(6));
      assert(!stack.contains(7));
      assert(!stack.contains(8));
    });
  });
});