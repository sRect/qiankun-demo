<template>
  <div ref="jqueryRef" class="jqueryDOM">
    jquery
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun';

export default {
  name: 'ReactCom',
  data() {
    return {
      microApp: null
    }
  },
  mounted() {
    this.microApp = loadMicroApp(
      { name: 'jqueryApp', entry: '//localhost:5000/jquery', container: this.$refs.jqueryRef, props: { name: 'jquery' } },
    );
  },
  updated() {
    this.microApp.update({ name: 'jquery update' });
  },
  beforeDestroy() {
    this.microApp.unmount();
  },
}
</script>

<style scoped>
  .jqueryDOM {
    width: 100%;
    height: 600px;
    overflow: auto;
  }
</style>