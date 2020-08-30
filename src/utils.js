// (function(window) {
//   const storeTodo = {};
//   storeTodo.setTodo = function() {};
//   storeTodo.getTodo = function() {};

//   window.storeTodo = storeTodo;
// })(window);

export default {
  setTodo(val) {
    localStorage.setItem("todos_key", JSON.stringify(val));
  },
  getTodo() {
    return JSON.parse(localStorage.getItem("todos_key") || "[]");
  }
};
