<template>
  <li
    :style="{ background: background, color: footColor }"
    @mouseenter="rowStyle(true)"
    @mouseleave="rowStyle(false)"
  >
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del(index)">
      删除
    </button>
  </li>
</template>
<script>
import PubSub from "pubsub-js";
export default {
  props: {
    // 设置接收过来的todo的类型
    todo: Object,
    deleteToDo: Function,
    index: Number,
    toggleToDo: Function,
  },
  data() {
    return {
      background: "white",
      footColor: "black",
      isShow: false,
    };
  },
  methods: {
    rowStyle(flag) {
      if (flag) {
        this.background = "pink";
        this.footColor = "green";
        this.isShow = true;
      } else {
        this.background = "white";
        this.footColor = "black";
        this.isShow = false;
      }
    },
    del(index) {
      if (confirm("确定删除么?")) {
        // this.deleteToDo(index);
        PubSub.publish("deleteToDo", this.index);
      }
    },
  },
  computed: {
    isCompleted: {
      get() {
        return this.todo.isShow;
      },
      set(val) {
        //this.toggleToDo(this.todo);
        this.$bus.$emit("toggleToDo", this.todo);
      },
    },
  },
};
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
