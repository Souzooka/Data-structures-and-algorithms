const LinkedListNode = require("./LinkedListNode");

module.exports = function addLast(node) {
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
    this.last.next = node;
    node.previous = this.last;
    this.last = node;
  }
};