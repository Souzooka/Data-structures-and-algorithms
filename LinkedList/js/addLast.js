const LinkedListNode = require("./LinkedListNode");

module.exports = function addLast(node) {
  node = LinkedListNode.isLinkedListNode(node) ?
    node :
    new LinkedListNode(node);

  ++this.count;
  if (this.first === null) {
    this.first = node;
    this.last = node;
    this.first.list = this;
    return;
  }

  this.last.next = node;
  node.previous = this.last;
  this.last = node;
  this.last.list = this;
  return;
};