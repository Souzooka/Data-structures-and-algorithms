function Stack(enumerable) {

  // if first argument is an enumerable object, fill up stack with data from object else make empty stack
  if (typeof enumerable == "object" && enumerable !== null && typeof enumerable[Symbol.iterator] == "function") {
    this.__collection__ = [...enumerable];
  } else {
    this.__collection__ = [];
  }

  Object.defineProperty(this, "count", {
    get: function() { return this.__collection__.length; },
    configurable: false
  });
  Object.defineProperty(this, "__collection__", {
    configurable: false,
    writable: false
  });
}

module.exports = Stack;

Stack.prototype[Symbol.iterator] = require("./Symbol.iterator");
Stack.prototype.clear = require("./clear");
Stack.prototype.contains = require("./contains");
Stack.prototype.copyTo = require("./copyTo");
Stack.prototype.peek = require("./peek");
Stack.prototype.pop = require("./pop");
Stack.prototype.push = require("./push");
Stack.prototype.toArray = require("./toArray");