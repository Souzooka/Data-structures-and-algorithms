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
  if (typeof ll != "object") { return false; }

  return ll.constructor.name === "LinkedList";
};

module.exports = LinkedList;

LinkedList.prototype[Symbol.iterator] = require("./Symbol.iterator");
LinkedList.prototype.addAfter = require("./addAfter");
LinkedList.prototype.addBefore = require("./addBefore");
LinkedList.prototype.addFirst = require("./addFirst");
LinkedList.prototype.addLast = require("./addLast");
LinkedList.prototype.clear = require("./clear");
LinkedList.prototype.contains = require("./contains");
LinkedList.prototype.copyTo = require("./copyTo");
LinkedList.prototype.find = require("./find");
LinkedList.prototype.findLast = require("./findLast");
LinkedList.prototype.remove = require("./remove");
LinkedList.prototype.removeFirst = require("./removeFirst");
LinkedList.prototype.removeLast = require("./removeLast");