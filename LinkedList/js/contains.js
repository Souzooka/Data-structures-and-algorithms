module.exports = function contains(value) {
  for (let nodeValue of this) {
    if (nodeValue === value) { return true; }
  }

  return false;
};