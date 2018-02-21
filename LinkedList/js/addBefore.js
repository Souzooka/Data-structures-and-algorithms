const LinkedListNode = require("./LinkedListNode");

module.exports = function addBefore(node, toAdd) {
  if (!LinkedListNode.isLinkedListNode(node)) {
    node = this.find(node);

    if (node === null) {
      throw new Error("Error: LinkedList#addBefore: Value was not in LinkedList");
    }
  }

  if (node.list !== this) {
    throw new Error("Error: LinkedList#addBefore: Node was not in LinkedList");
  }

  toAdd = LinkedListNode.isLinkedListNode(toAdd) ?
    toAdd :
    new LinkedListNode(toAdd);

  if (this.first === node) { this.first = toAdd; }
  if (node.previous !== null) { node.previous.next = toAdd; }
  toAdd.list = this;
  toAdd.previous = node.previous;
  node.previous = toAdd;
  toAdd.next = node;
  ++this.count;
};