import React, { memo, useEffect, useRef, useState } from "react";
// import { loadMicroApp, initGlobalState } from "qiankun";
import { loadMicroApp } from "qiankun";
import { message, Drawer } from "antd";
import { handleModelLoad, addModelBtn } from "@/utils";
import "./modelShow.css";

/* global Autodesk */
function ModelShow() {
  const [viewer, setViewer] = useState(null);
  const [drawerVisible1, setDrawerVisible1] = useState(false);
  const [drawerVisible2, setDrawerVisible2] = useState(false);
  // const [globalAction, setGlobalAction] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(true);
  const modelWrapRef = useRef(null);
  const vueRef1 = useRef(null);
  const vueRef2 = useRef(null);

  useEffect(() => {
    if (!modelWrapRef.current) return;

    handleModelLoad({
      modelPath: `${process.env.PUBLIC_URL}model/44b3520e-50e6-426b-a189-2b3a6ddad229/3d.svf`,
      modelWrap: modelWrapRef.current,
      uploadFrom: 4,
    })
      .then((oViewer) => {
        message.success("模型加载完成");
        // setDrawerVisible(true);
        setViewer(oViewer);
        
      })
      .catch((err) => {
        console.log("模型加载异常:", err);
        message.warn(`模型加载异常,errorCode: ${err}`);
      });
  }, [modelWrapRef]);

  useEffect(() => {
    if (!viewer || !vueRef1.current || !vueRef2.current) return;

    const micro1 = loadMicroApp({
      name: "vueApp",
      entry: "//localhost:8000/modelShow",
      container: vueRef1.current,
      props: {
        name: "vue",
        active: 1,
        viewer,
        AV: Autodesk.Viewing,
        addModelBtn,
        setDrawerVisible1,
        setDrawerVisible2,
        defaultActiveName: "first",
      },
    });

    const micro2 = loadMicroApp({
      name: "vueApp",
      entry: "//localhost:8000/modelShow",
      container: vueRef2.current,
      props: {
        name: "vue",
        active: 2,
        viewer,
        AV: Autodesk.Viewing,
        addModelBtn,
        setDrawerVisible1,
        setDrawerVisible2,
        defaultActiveName: "second",
      },
    });

    return () => {
      micro1.unmount();
      micro2.unmount();
    }
  }, [vueRef1, vueRef2, viewer]);

  // useEffect(() => {
  //   const globalAction =  initGlobalState({
  //     drawerVisible1: false,
  //     drawerVisible2: false,
  //   });

  //   setGlobalAction(globalAction);
  // }, []);

  // useEffect(() => {
  //   if(!globalAction) return;

  //   globalAction.onGlobalStateChange((state, prev) => {
  //     // state: 变更后的状态; prev 变更前的状态
  //     console.log("base app==>", state);
  //     if(state.drawerVisible1) setDrawerVisible1(true);
  //     if (state.drawerVisible2) setDrawerVisible2(true);
  //   });
  // }, [globalAction]);

  return (
    <div>
      <div className="modelWrap" ref={modelWrapRef}></div>
      <Drawer
        title="Basic Drawer 1"
        placement="left"
        closable={true}
        forceRender={true}
        mask={false}
        visible={drawerVisible1}
        onClose={() => setDrawerVisible1(false)}
        getContainer={() => viewer?.container?.parentNode || document.body}
        style={{ position: "absolute" }}
        width={400}
      >
        <div
          ref={vueRef1}
          style={{ width: "100%", height: "100vh", overflow: "auto" }}
        ></div>
      </Drawer>

      <Drawer
        title="Basic Drawer 2"
        placement="right"
        closable={true}
        forceRender={true}
        mask={false}
        visible={drawerVisible2}
        onClose={() => setDrawerVisible2(false)}
        getContainer={() => viewer?.container?.parentNode || document.body}
        style={{ position: "absolute" }}
        width={400}
      >
        <div
          ref={vueRef2}
          style={{ width: "100%", height: "100vh", overflow: "auto" }}
        ></div>
      </Drawer>

      {/* <Modal
        title="过滤器"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        
      </Modal> */}
    </div>
  );
}

export default memo(ModelShow);