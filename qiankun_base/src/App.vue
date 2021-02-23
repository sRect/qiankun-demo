<template>
  <div id="app">
      <el-menu :router="true"  mode="horizontal">
        <!-- 基座自己的路由 -->
        <el-menu-item index="/">base-home</el-menu-item>
        <el-menu-item index="/about">base-about</el-menu-item>
        <!-- 引用其他子应用 -->
        <el-menu-item index="/vue">vue 应用</el-menu-item>
        <el-menu-item index="/react">react 应用</el-menu-item>
      </el-menu>

      <router-view/>

      <div id="vueDOM"></div>
      <div id="react"></div>
  </div>
</template>
