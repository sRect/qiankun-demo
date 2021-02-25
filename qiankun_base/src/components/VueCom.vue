<template>
  <div ref="vueRef" class="vueDOM">
    vue
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun';

export default {
  name: 'VueCom',
  data() {
    return {
      microApp: null
    }
  },
  mounted() {
    this.microApp = loadMicroApp(
      { name: 'vueApp', entry: '//localhost:8000/vue', container: this.$refs.vueRef, props: { name: 'vue' } },
    );
  },
  updated() {
    this.microApp.update({ name: 'vue update' });
  },
  beforeDestroy() {
    this.microApp.unmount();
  },
}
</script>

<style  scoped>
  .vueDOM {
    width: 100%;
    height: 600px;
    overflow: auto;
  }
</style>