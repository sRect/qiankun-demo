<template>
  <div ref="reactRef" class="reactDOM">
    react
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
      { name: 'reactApp', entry: '//localhost:9000/react', container: this.$refs.reactRef, props: { name: 'react' } },
    );
  },
  updated() {
    this.microApp.update({ name: 'react update' });
  },
  beforeDestroy() {
    this.microApp.unmount();
  },
}
</script>

<style  scoped>
  .reactDOM {
    width: 100%;
    height: 600px;
    overflow: auto;
  }
</style>