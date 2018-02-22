const LinkedListNode = require("./LinkedListNode");

module.exports = function addFirst(node) {
  node = LinkedListNode.isLinkedListNode(node) ?
    node :
    new LinkedListNode(node);

  if (node.list !== null) {
    throw new Error("node already belongs to a list");
  }

  node.list = this;
  ++this.count;
  if (this.first === null) {
    this.first = node;
    this.last = node;
  } else {
    this.first.previous = node;
    node.next = this.first;
    this.first = node;
  }
};