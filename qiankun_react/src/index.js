import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter basename="/react">
        <Link to="/">react-home</Link> |<Link to="/about">react-about</Link>
        {/* exact 严格模式 */}
        <Route path="/" exact render={() => <App />}></Route>
        <Route
          path="/about"
          exact
          render={() => <div>react about page</div>}
        ></Route>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {}
export async function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log("child_react props change=====>", state, prev);
  });
  render();
}
export async function unmount(props) {
  const { container } = props;

  console.log("container===>", container);

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector("#root") : document.querySelector("#root")
  );
}

// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
  render(props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
