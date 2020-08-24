<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo" />
      <TodoList
        :todos="todos"
        :deleteToDo="deleteToDo"
        :toggleToDo="toggleToDo"
      />
      <TodoFooter :todos="todos" />
    </div>
  </div>
</template>
<script>
// 当前这个父级组件中,引入三个子级组件
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  // 注册组件
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },
  // 和之前的data中的写法一样
  data() {
    return {
      todos: [
        { id: 1, title: "奔驰", isShow: false },
        { id: 2, title: "宝马", isShow: true },
        { id: 3, title: "奥拓", isShow: false }
      ]
    };
  },
  methods: {
    deleteToDo(index) {
      this.todos.splice(index, 1);
    },
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    // 传入一个对象,判断是否选中
    toggleToDo(todo) {
      todo.isShow = !todo.isShow;
    }
  }
};
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
