const LinkedListNode = require("./LinkedListNode");

function LinkedList(...nodes) {
  this.first = null;
  this.last = null;
  this.count = 0;
  Object.defineProperty(this, "head", {configurable: false});
  Object.defineProperty(this, "tail", {configurable: false});
  Object.defineProperty(this, "count", {configurable: false});

  for (let node of nodes) {
    this.addLast(node);
  }
};

LinkedList.isLinkedList = function isLinkedList(node) {
  if (node === null || node === undefined) { return false; }
  if (!node.hasOwnProperty(constructor)) { return false; }
  if (node.constructor === null || node.constructor === undefined) { return false; }
  return node.constructor.name === "LinkedList";
};

module.exports = LinkedList;

LinkedList.prototype.addLast = require("./addLast");