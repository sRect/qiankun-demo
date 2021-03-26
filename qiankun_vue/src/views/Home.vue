<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld v-if="active === 1" msg="Welcome to Your Vue.js App" />
    <div v-else>active 2</div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  inject: [
    "viewer",
    "AV",
    "addModelBtn",
    "active",
    "setGlobalState",
    "setDrawerVisible1",
    "setDrawerVisible2",
    "defaultActiveName",
  ],

  data() {
    return {
      activeName: this.defaultActiveName
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },

  mounted() {
    const _this = this;

    this.addModelBtn({
      Viewer: this.viewer,
      AV: this.AV,
      toolbarName: "modelTools",
    })({
      btnName: "fliterBtn",
      iconClass: "filter",
      toolTip: "过滤器",
      btnType: 0, // 0为按钮组 1为按钮
      callback: function() {
        const state = this.getState();
        console.log(state);
        // _this.setGlobalState({
        //   drawerVisible1: true
        // })
        _this.setDrawerVisible1(state);
      },
    });

    this.addModelBtn({
      Viewer: this.viewer,
      AV: this.AV,
      toolbarName: "modelTools",
    })({
      btnName: "selectWindowBtn",
      iconClass: "selectWindow",
      toolTip: "框选",
      btnType: 0, // 0为按钮组 1为按钮
      callback: function() {
        console.log("selectWindowBtn!!!");
        const state = this.getState();
        // _this.setGlobalState({
        //   drawerVisible2: true
        // })
        _this.setDrawerVisible2(state);
      },
    });
  },
};
</script>
