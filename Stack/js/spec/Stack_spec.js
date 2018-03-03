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
});