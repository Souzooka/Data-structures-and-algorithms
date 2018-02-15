function LinkedListNode(value, next = null, previous = null) {
  this.value = value;
  this.next = next;
  this.previous = previous;
}

LinkedListNode.isLinkedListNode = function isLinkedListNode(node) {
  if (node === null || node === undefined) { return false; }
  if (!node.hasOwnProperty(constructor)) { return false; }
  if (node.constructor === null || node.constructor === undefined) { return false; }
  return node.constructor.name === "LinkedListNode";
};

module.exports = LinkedListNode;