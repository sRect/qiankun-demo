import { loadMicroApp } from "qiankun";
import {useEffect, useRef} from 'react';
import './App.css';

function App() {
  // const [microApp, setMicroApp] = useState(null);
  const vueRef = useRef(null);
  const reactRef = useRef(null);
  const jqueryRef = useRef(null);

  useEffect(() => {
    if(!vueRef.current) return;

    const micro = loadMicroApp({
      name: "vueApp",
      entry: "//localhost:8000/vue",
      container: vueRef.current,
      props: { name: "vue" },
    });

    return () => micro.unmount();
  }, [vueRef]);

  useEffect(() => {
    if (!reactRef.current) return;

    const micro = loadMicroApp({
      name: "reactApp",
      entry: "//localhost:9000/react",
      container: reactRef.current,
      props: { name: "react" },
    });

    return () => micro.unmount();
  }, [reactRef]);

  useEffect(() => {
    if (!jqueryRef.current) return;

    const micro = loadMicroApp({
      name: "jqueryApp",
      entry: "//localhost:5000/jquery",
      container: jqueryRef.current,
      props: { name: "jquery" },
    });

    return () => micro.unmount();
  }, [jqueryRef]);


  return (
    <div className="App">
      <div className="item">
        <div>vue 应用:</div>
        <div ref={vueRef}></div>
      </div>

      <div className="item">
        <div>react 应用:</div>
        <div ref={reactRef}></div>
      </div>

      <div className="item">
        <div>jquery 应用:</div>
        <div ref={jqueryRef}></div>
      </div>
    </div>
  );
}

export default App;
