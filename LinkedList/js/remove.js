const LinkedListNode = require("./LinkedListNode");

module.exports = function remove(node) {
  node = LinkedListNode.isLinkedListNode(node) ?
    node :
    this.find(node);

  if (node === null) {
    throw new Error("Remove: Value was not found inside linked list.");
  }
  if (node.list !== this) {
    throw new Error("Argument does not belong to this list.");
  }

  if (node === this.first) {
    this.removeFirst();
    return;
  }
  if (node === this.last) {
    this.removeLast();
    return;
  }

  node.previous.next = node.next;
  node.next.previous = node.previous;
  node.list = null;
  --this.count;
  return;
};