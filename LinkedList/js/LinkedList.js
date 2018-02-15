const LinkedListNode = require("./LinkedListNode");

function LinkedList(...nodes) {
  this.first = null;
  this.last = null;
  this.count = 0;
  Object.defineProperty(this, "first", {configurable: false});
  Object.defineProperty(this, "last", {configurable: false});
  Object.defineProperty(this, "count", {configurable: false});

  for (let node of nodes) {
    this.addLast(node);
  }
};

LinkedList.isLinkedList = function isLinkedList(ll) {
  if (ll == null) { return false; }
  if (ll == undefined) { return false; }
  if (typeof ll != "object") { return false; }

  return ll.constructor.name === "LinkedListNode";
};

module.exports = LinkedList;

LinkedList.prototype.addLast = require("./addLast");