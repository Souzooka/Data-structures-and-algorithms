const LinkedListNode = require("./LinkedListNode");

module.exports = function addAfter(node, toAdd) {
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
    throw new Error("Second argument to addAfter already belongs to a list");
  }

  if (this.last === node) { this.last = toAdd; }
  if (node.next !== null) { node.next.previous = toAdd; }
  toAdd.list = this;
  toAdd.next = node.next;
  node.next = toAdd;
  toAdd.previous = node;
  ++this.count;
};