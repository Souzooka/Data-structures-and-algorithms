const LinkedListNode = require("./LinkedListNode");

module.exports = function addFirst(node) {
  node = LinkedListNode.isLinkedListNode(node) ?
    node :
    new LinkedListNode(node);

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