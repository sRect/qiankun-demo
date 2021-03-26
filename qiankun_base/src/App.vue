<template>
  <div id="app">
    <el-menu :router="true" mode="horizontal">
      <!-- 基座自己的路由 -->
      <el-menu-item index="/">base-home</el-menu-item>
      <el-menu-item index="/baseAbout">base-about</el-menu-item>
      <!-- 引用其他子应用 -->
      <!-- <el-menu-item index="/vue">vue 应用</el-menu-item>
      <el-menu-item index="/react">react 应用</el-menu-item>
      <el-menu-item index="/jquery">jquery + bootstrap 应用</el-menu-item> -->
    </el-menu>

    <router-view />
  </div>
</template>

<script>
import { initGlobalState } from "qiankun";

const actions = initGlobalState({});

export default {
  name: "App",
  data() {
    return {
      globalData: {
        a: 1,
        b: { a: 1, b: 2 },
        c: [1, 2, { a: 1 }],
      },
    };
  },
  provide() {
    return {
      globalData: this.globalData,
      globalActions: actions
    }
  },
  mounted() {
    actions.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log("base app==>", state, prev);
    });
    actions.setGlobalState(this.globalData);
  },
  destroyed() {
    actions.offGlobalStateChange();
  },
};
</script>
