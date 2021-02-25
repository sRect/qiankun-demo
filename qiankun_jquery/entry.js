//qiankun.umijs.org/zh/guide/tutorial#非-webpack-构建的微应用

const render = ($) => {
  $("#purehtml-container").html("Hello, render with jQuery");
  return Promise.resolve();
};
((global) => {
  // global.__POWERED_BY_QIANKUN__ ||
  //   (__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);

  global["jqueryApp"] = {
    bootstrap: () => {
      console.log("purehtml bootstrap");
      return Promise.resolve();
    },
    mount: (props) => {
      console.log("purehtml mount", props);

      props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log("child_jquery props change=====>", state, prev);
      });

      return render($);
    },
    unmount: (props) => {
      console.log("purehtml unmount");
      const { container } = props;
      container
        ? container.querySelector("#root")
        : document.querySelector("#root");

      return Promise.resolve();
    },
    // 增加 update 钩子以便主应用手动更新微应用
    update: (props) => {
      render($);
    },
  };
})(window);
