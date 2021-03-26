import axios from "axios";
import { message } from "antd";
// import { handleRemoveCameraSubmenuToolBtn } from '@/pages/ModelShow/handleModelLoadTasks';

const setModelJsonUrn = (data, modelFileUrl) => {
  for (let i = 0; i < data.length; i++) {
    let isModify = false;
    if (
      data[i].mime &&
      (data[i].mime.indexOf("autodesk-db") >= 0 ||
        data[i].mime.indexOf("json") >= 0 ||
        data[i].mime.indexOf("autodesk-svf") >= 0)
    ) {
      isModify = true;
    }
    if (data[i].urn && isModify) {
      let splitUrn = data[i].urn.split("/");
      if (splitUrn[2]) {
        data[i].urn = modelFileUrl + splitUrn[1] + "/" + splitUrn[2];
      } else {
        data[i].urn = modelFileUrl + splitUrn[1];
      }
    } else if (data[i].children) {
      setModelJsonUrn(data[i].children, modelFileUrl);
    }
  }
  return data;
};

const resolveJson = (modelJsonUrl) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${modelJsonUrl}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(() => reject());
  });
};

const initModel = ({
  oViewer,
  modelWrap,
  config,
  modelPath,
  options,
  is3dModel,
  viewLink,
  manifestJsonObject,
  uploadFrom,
  reject,
  resolve,
}) => {
  oViewer = new window.Autodesk.Viewing.Private.GuiViewer3D(modelWrap, config); // With toolbar

  let sharedPropertyDbPath = null;
  let optionObj = null;
  if (modelPath.indexOf(".f2d") >= 0) {
    sharedPropertyDbPath = modelPath.split("f2d_")[0];
    optionObj = { sharedPropertyDbPath: sharedPropertyDbPath.split("?")[0] };
  }

  window.Autodesk.Viewing.Initializer(options, function () {
    if (is3dModel && viewLink && uploadFrom !== 4) {
      const viewerDocument = new window.Autodesk.Viewing.Document(
        manifestJsonObject
      );
      viewerDocument.downloadAecModelData();
      oViewer.start();
      oViewer.loadDocumentNode(
        viewerDocument,
        viewerDocument.getRoot().getDefaultGeometry()
      );
    } else {
      oViewer.initialize();
      if (modelPath.endsWith(".pdf")) {
        oViewer.loadExtension("Autodesk.PDF").then(() => {
          // pdf加载默认设置为第一页
          oViewer.loadModel(options.docid, { page: 1 });
          oViewer.setSwapBlackAndWhite(false); //false使图纸背景变为白色，true使图纸背景变为黑色
        }); // eslint-disable-line
      } else {
        oViewer.loadModel(options.docid, optionObj, null, function (err) {
          reject(err);
        }); // eslint-disable-line
        oViewer.setSwapBlackAndWhite(true); //false使图纸背景变为白色，true使图纸背景变为黑色
      }
    }

    oViewer.setTheme("light-theme");
    oViewer.addEventListener(
      window.Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      function () {
        resolve(oViewer);
        try {
          const toolbar = oViewer.getToolbar();
          const navTools = toolbar.getControl("navTools");
          navTools?.removeControl("toolbar-cameraSubmenuTool");
          //pdf中隐藏“测量”、“属性”、“图层”和“显示所有图层”
          if (modelPath.endsWith(".pdf")) {
            const modelTools = toolbar.getControl("modelTools");
            const settingsTools = toolbar.getControl("settingsTools");
            modelTools?.removeControl("toolbar-measurementSubmenuTool");
            modelTools?.removeControl("toolbar-levelsTool");
            settingsTools?.removeControl("toolbar-propertiesTool");
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  });
};

/**
 * 模型加载
 * @param {String} modelPath
 * @param {Element} modelWrap
 */
const handleModelLoad = ({ modelPath, modelWrap, uploadFrom }) => {
  return new Promise((resolve, reject) => {
    let oViewer = null;
    let docs = [
      {
        path: modelPath,
        name: "Scene",
      },
    ];

    let options = {
      docid: docs[0].path,
      env: "Local",
      language: "zh-HANS",
    };
    let is3dModel = false;
    let manifestJsonObject = null;
    let config = {
      memory: {
        limit: 32 * 1024, //1 GB
      },
    };
    let viewLink = false;
    if (modelPath.indexOf(".svf") >= 0 && uploadFrom !== 4) {
      is3dModel = true;
      //添加2/3D联动需要的功能拓展
      config.extensions = [
        "Autodesk.AEC.LevelsExtension",
        "Autodesk.AEC.Minimap3DExtension",
      ];
      let modelJsonUrl = modelPath.replace("3d.svf", "manifest-model.json");
      let modelFileUrl = modelPath.replace("3d.svf", "");

      resolveJson(modelJsonUrl)
        .then((data) => {
          viewLink = true;
          manifestJsonObject = data;
          manifestJsonObject.derivatives = setModelJsonUrn(
            manifestJsonObject.derivatives,
            modelFileUrl
          );
          // console.log('manifestJsonObject====================>', manifestJsonObject);
          initModel({
            oViewer,
            modelWrap,
            config,
            modelPath,
            options,
            is3dModel,
            viewLink,
            manifestJsonObject,
            uploadFrom,
            reject,
            resolve,
          });
        })
        .catch(() => message.warning("部分文件加载失败，第一视角功能受限"));
      return;
    }

    initModel({
      oViewer,
      modelWrap,
      config,
      modelPath,
      options,
      is3dModel,
      viewLink,
      manifestJsonObject,
      uploadFrom,
      reject,
      resolve,
    });
  });
};

export default handleModelLoad;
