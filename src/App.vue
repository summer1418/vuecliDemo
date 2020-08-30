<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="addTodo" />
      <TodoList
        :todos="todos"
        :deleteToDo="deleteToDo"
        :toggleToDo="toggleToDo"
      />
      <TodoFooter :todos="todos" :CheckedAll="CheckedAll">
        <label slot="left">
          <input type="checkbox" v-model="isChecked" />
        </label>
        <span slot="center">
          <span>已完成{{ count }}</span> / 全部{{ todos.length }}
        </span>
        <button slot="right" class="btn btn-danger" v-show="count > 0">
          清除已完成任务
        </button>
      </TodoFooter>
    </div>
  </div>
</template>
<script>
// 当前这个父级组件中,引入三个子级组件
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
import PubSub from "pubsub-js";
import StoreTodo from "./utils.js";
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
      // todos: [
      //   { id: 1, title: "奔驰", isShow: false },
      //   { id: 2, title: "宝马", isShow: true },
      //   { id: 3, title: "奥拓", isShow: false }
      // ]
      //todos: JSON.parse(localStorage.getItem("todos_key") || "[]")
      todos: StoreTodo.getTodo()
    };
  },
  mounted() {
    console.log(StoreTodo.getTodo());
    this.$bus.$on("toggleToDo", todo => {
      this.toggleToDo(todo);
    });
    PubSub.subscribe("deleteToDo", (msg, index) => {
      this.deleteToDo(index);
    });
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
    },
    CheckedAll(isChecked) {
      this.todos.forEach(todo => {
        todo.isShow = isChecked;
      });
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: StoreTodo.setTodo
    }
  },
  computed: {
    //勾选的个数
    count() {
      return this.todos.reduce((pre, todo) => pre + (todo.isShow ? 1 : 0), 0);
    },
    isChecked: {
      get() {
        return this.todos.length === this.count && this.count > 0;
      },
      set(val) {
        this.CheckedAll(val);
      }
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
