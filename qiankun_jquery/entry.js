//qiankun.umijs.org/zh/guide/tutorial#非-webpack-构建的微应用

const render = ($) => {
  $("#purehtml-container").html("Hello, render with jQuery");
  return Promise.resolve();
};
((global) => {
  global["purehtml"] = {
    bootstrap: () => {
      console.log("purehtml bootstrap");
      return Promise.resolve();
    },
    mount: (props) => {
      console.log("purehtml mount", props);
      return render($);
    },
    unmount: () => {
      console.log("purehtml unmount");
      return Promise.resolve();
    },
  };
})(window);
