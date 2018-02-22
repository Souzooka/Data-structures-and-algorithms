const LinkedListNode = require("./LinkedListNode");

module.exports = function addAfter(node, toAdd) {
  if (!LinkedListNode.isLinkedListNode(node)) {
    node = this.find(node);

    if (node === null) {
      throw new Error("Error: LinkedList#addAfter: Value was not in LinkedList");
    }
  }

  if (node.list !== this) {
    throw new Error("Error: LinkedList#addAfter: Node was not in LinkedList");
  }

  toAdd = LinkedListNode.isLinkedListNode(toAdd) ?
    toAdd :
    new LinkedListNode(toAdd);

  if (this.last === node) { this.last = toAdd; }
  if (node.next !== null) { node.next.previous = toAdd; }
  toAdd.list = this;
  toAdd.next = node.next;
  node.next = toAdd;
  toAdd.previous = node;
  ++this.count;
};