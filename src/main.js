// 引入Vue
import Vue from "./node_modules/vue";
// 引入App组件
import App from "./App.vue";
new Vue({
  el: "#app",
  // 注册组件
  components: {
    App
  },
  template: "<App/>"
});
