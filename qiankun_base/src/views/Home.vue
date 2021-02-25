<template>
  <div class="home">
    基座默认主页
    <br />
    <el-button type="primary" @click="changeBaseProps">changeBaseProps</el-button>
    <hr />
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="title">vue应用：</div>
              <!-- <div id="vueDOM"></div> -->
              <VueCom />
              
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div>react应用：</div>
              <!-- <div id="react"></div> -->
              <ReactCom />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div>jquery应用：</div>
              <!-- <div id="jquery"></div> -->

              <JqueryCom />
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        Footer
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import VueCom from '@/components/VueCom';
import ReactCom from '@/components/ReactCom';
import JqueryCom from '@/components/JqueryCom';

export default {
  name: 'Home',
  inject: ['globalData', 'globalActions'],
  components: {
    VueCom,
    ReactCom,
    JqueryCom,
  },
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

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main:not(.title) {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
