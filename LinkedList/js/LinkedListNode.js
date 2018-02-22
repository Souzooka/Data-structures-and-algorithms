const LinkedList = require("./LinkedList");

function LinkedListNode(value, next = null, previous = null, list = null) {
  if (next !== null && !LinkedListNode.isLinkedListNode(next)) { 
    throw new TypeError("Second argument to LinkedListNode must be null or LinkedListNode");
  }
  if (previous !== null && !LinkedListNode.isLinkedListNode(previous)) {
    throw new TypeError("Third argument to LinkedListNode must be null or LinkedListNode");
  }
  if (list !== null && !LinkedList.isLinkedList(list)) {
    throw new TypeError("Fourth argument to LinkedListNode must be null or LinkedList");
  }

  this.value = value;
  this.next = next;
  this.previous = previous;
  this.list = list;

  Object.defineProperty(this, "value", {configurable: false});
  Object.defineProperty(this, "next", {configurable: false});
  Object.defineProperty(this, "previous", {configurable: false});
  Object.defineProperty(this, "list", {configurable: false});
}

LinkedListNode.isLinkedListNode = function isLinkedListNode(node) {
  if (node == null) { return false; }
  if (typeof node != "object") { return false; }

  return node.constructor.name === "LinkedListNode";
};

module.exports = LinkedListNode;