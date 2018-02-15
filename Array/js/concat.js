const MyArray = require("./MyArray");

module.exports = function concat() {
  let newArr = MyArray.from(this);

  for (let i = 0; i < arguments.length; ++i) {
    if (MyArray.isMyArray(arguments[i])) {
      for (let val of arguments[i]) {
        newArr.push(val);
      } 
    } else {
      newArr.push(arguments[i]);
    }
  }

  return newArr;
}