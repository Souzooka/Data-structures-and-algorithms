const LinkedListNode = require("./LinkedListNode");

module.exports = function addBefore(node, toAdd) {
  if (!LinkedListNode.isLinkedListNode(node)) {
    throw new TypeError("First argument to addAfter must be a LinkedListNode");
  }
  if (node.list !== this) {
    throw new Error("LinkedList#addAfter: Node was not in LinkedList");
  }

  toAdd = LinkedListNode.isLinkedListNode(toAdd) ?
    toAdd :
    new LinkedListNode(toAdd);

  if (toAdd.list !== null) {
    throw new Error("Second argument to addBefore already belongs to a list");
  }

  if (this.first === node) { this.first = toAdd; }
  if (node.previous !== null) { node.previous.next = toAdd; }
  toAdd.list = this;
  toAdd.previous = node.previous;
  node.previous = toAdd;
  toAdd.next = node;
  ++this.count;
};