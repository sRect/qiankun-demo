<template>
  <div ref="jqueryRef" class="jqueryDOM">
    jquery
  </div>
</template>

<script>
// https://github.com/umijs/qiankun/issues/7

import { loadMicroApp } from "qiankun";

export default {
  name: "ReactCom",
  data() {
    return {
      microApp: null,
    };
  },
  mounted() {
    this.microApp = loadMicroApp({
      name: "jqueryApp",
      entry: "//localhost:5000/jquery",
      // entry: {
      //   scripts: [
      //     "//localhost:5000/lib/jquery.min.js",
      //     "//localhost:5000/lib/bootstrap.min.js",
      //     "//localhost:5000/entry.js"
      //   ],
      //   styles: ["//localhost:5000/lib/bootstrap.min.css"],
      //   html: "<h1>hello world</h1>"
      // },
      container: this.$refs.jqueryRef,
      // configuration: {
      //   sandbox: {
      //     strictStyleIsolation: true,
      //     experimentalStyleIsolation: true
      //   },
      // },
      props: { name: "jquery" },
    });
  },
  updated() {
    this.microApp.update({ name: "jquery update" });
  },
  beforeDestroy() {
    this.microApp.unmount();
  },
};
</script>

<style scoped>
.jqueryDOM {
  width: 100%;
  height: 600px;
  overflow: auto;
}
</style>
