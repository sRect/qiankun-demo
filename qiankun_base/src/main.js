import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps, start } from 'qiankun';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

const apps = [
  {
    name: "vueApp",
    entry: "http://localhost:8000", // 默认通过fetch加载这个html，解析里面的js，动态的执行（但同时子应用必须支持跨域）
    container: "#vueDOM", // 容器名
    activeRule: "/vue", // 激活路径
    props: { a: 1, b: 2 },
  },
  {
    name: "reactApp",
    entry: "//localhost:9000",
    container: "#react",
    activeRule: "/react",
  },
  {
    name: "jqueryApp",
    entry: "//localhost:5000",
    container: "#jquery",
    activeRule: "/jquery",
    props: {a: 100, b: 200}
  },
];

registerMicroApps(apps); // 注册应用
// 启动应用
start({
  prefetch: false // 取消预加载
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
