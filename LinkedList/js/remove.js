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

  if (node.previous !== null) {
    node.previous.next = node.next;
  }

  if (node.next !== null) {
    node.next.previous = node.previous;
  }
  node.list = null;
  --this.count;
  return;
};