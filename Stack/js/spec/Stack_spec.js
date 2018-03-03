const {assert} = require("chai");
const Stack = require("../Stack");

describe("Stack", function() {
  describe("constructor", function() {
    it("should initialize an empty stack given no arguments", function() {
      let stack = new Stack();

      assert.strictEqual(stack.count, 0);
    });
  });
});