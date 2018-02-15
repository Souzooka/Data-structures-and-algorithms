/*
  MyArray.prototype.every
  Parameters:
    predicate (Function([any, [Number, [any[]]]])):
      A function used to test an element. Receives 3 arguments:
        value (any): the value of the array element
        index (Number): the index of the array element
        array (any[]): the array being called upon
    [thisArg (any)]:
      Argument that is used as context in predicate function (default this)
  Return value:
    true if all array elements return true when passed to predicate,
    else false
  Behavior/remarks:
    Performs a check against all array elements using a predicate,
    and returns a boolean indicating whether all array elements pass
    that check.
    Not as robust/generic as Array.prototype.every, and may
    have undesired behavior if called with a non-MyArray object.
*/

module.exports = function every(predicate, thisArg = this) {
  predicate = predicate.bind(thisArg);

  for (let idx in this) {
    if (!predicate(this[idx], Number(idx), this)) {
      return false;
    }
  }

  return true;
}