<template>
  <div class="home">
    基座默认主页
    <br />
    <el-button type="primary" @click="changeBaseProps">changeBaseProps</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  inject: ['globalData', 'globalActions'],
  methods: {
    changeBaseProps() {
      this.globalActions.setGlobalState({
        ...this.globalData,
        a: 100,
        b: {
          ...this.globalData.b,
          b: 200
        }
      })
    }
  },
}
</script>
