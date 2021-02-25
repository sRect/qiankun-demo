import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false

let vueInstance = null;
function render(props = {}) {
  const { container } = props;

  vueInstance = new Vue({
    router,
    render: h => h(App)
    // 这里是挂载到自己的html上，基座会拿到这个挂载后的html，将其插入到相应的容器里

    // Application died in status NOT_MOUNTED: Target container with #container not existed after xxx mounted!
    // 微应用的根 id 与其他 DOM 冲突。解决办法是：修改根 id 的查找范围。
  }).$mount(container ? container.querySelector('#app') : '#app'); 
}

// 使用 webpack 运行时 publicPath 配置
// 动态设置publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// https://qiankun.umijs.org/zh/faq#如何独立运行微应用？
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 暴露3个异步方法 bootstrap mount unmount
export async function bootstrap(props) { }
export async function mount(props) { 
  console.log('props=====>', props)
  render(props);
}
export async function unmount(props) {
  vueInstance && vueInstance.$destroy();
  vueInstance = null;
}
