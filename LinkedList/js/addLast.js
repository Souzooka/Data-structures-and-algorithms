const LinkedListNode = require("./LinkedListNode");

module.exports = function addLast(node) {
  node = LinkedListNode.isLinkedListNode(node) ?
    node :
    new LinkedListNode(node);

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