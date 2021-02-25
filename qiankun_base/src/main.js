import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps, start, prefetchApps } from "qiankun";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

const apps = [
  {
    name: "vueApp",
    // 默认通过fetch加载这个html，解析里面的js，动态的执行
    // 注意：子应用必须支持跨域
    entry: "http://localhost:8000",
    container: "#vueDOM", // 容器名
    activeRule: "/vue", // 激活路径
    props: { a: 1, b: 2 }, // 传给子应用的参数
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
    props: { a: 100, b: 200 },
  },
];

// registerMicroApps(apps); // 注册应用
// prefetchApps([{ name: "jqueryApp", entry: "//localhost:5000/jquery" }]);

// 启动应用
start({
  prefetch: true
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
