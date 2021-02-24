// 使用 webpack 运行时 publicPath 配置
// 动态设置publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// https://qiankun.umijs.org/zh/faq#如何独立运行微应用？
if (!window.__POWERED_BY_QIANKUN__) {
  // render();
}

// 暴露3个异步方法 bootstrap mount unmount
export async function bootstrap(props) {}
export async function mount(props) {
  console.log("jquery=====>", props);
  // render(props);
}
export async function unmount(props) {
  // vueInstance && vueInstance.$destroy();
  document.getElementById("app").innerHTML = "";
}
