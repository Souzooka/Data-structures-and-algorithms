const LinkedList = require("../../LinkedList/js/LinkedList.js");

function Queue(enumerable) {
  // if first argument is an enumerable object, fill up stack with data from object else make empty queue
  if (typeof enumerable == "object" && enumerable !== null && typeof enumerable[Symbol.iterator] == "function") {
    this.__collection__ = new LinkedList(...enumerable);
  } else {
    this.__collection__ = new LinkedList();
  }

  Object.defineProperty(this, "count", {
    get: function() { return this.__collection__.count; },
    configurable: false
  });
  Object.defineProperty(this, "__collection__", {
    configurable: false,
    writable: false
  });
}

module.exports = Queue;

Queue.prototype.peek = require("./peek");