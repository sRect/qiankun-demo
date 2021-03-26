import { message } from "antd";
import { debounce } from "lodash";

const BDIP_TOOLBAR_NAME = "bimBdipToolbar"; // bdip toolbar名称

// 创建单个按钮
function createModelleBtn({ AV, btnName, iconClass, toolTip, callback }) {
  const modelBtn = new AV.UI.Button(btnName);

  modelBtn.setIcon(iconClass);
  modelBtn.setToolTip(toolTip);
  // https://lodash.com/docs/4.17.15#debounce
  modelBtn.onClick = debounce(
    function () {
      const state = modelBtn.getState();

      callback.call(this, ...arguments);
      Number.parseInt(state) === 1
        ? modelBtn.setState(0)
        : modelBtn.setState(1);
    },
    180,
    {
      leading: true,
      trailing: false,
    }
  );

  return modelBtn;
}

/**
 * 模型添加按钮
 * @param {Object} Viewer       模型对象
 * @param {Object} AV           Autodesk.Viewing
 * @param {String} toolbarName  按钮要添加到目标toolbar的名称
 * @param {Number} index        按钮要添加到目标toolbar的位置
 */
const addModelBtn = ({ Viewer, AV, toolbarName, index = 0 }) => ({
  btnName,
  iconClass,
  toolTip,
  btnType = 0, // 0为按钮组 1为按钮
  btnList = [],
  callback = function () {},
}) => {
  if (!Viewer || !AV) return message.warning("模型对象丢失，请重新打开模型");

  const toolbar = Viewer.getToolbar();
  const targetToolbar =
    toolbar.getControl(toolbarName) ||
    new AV.UI.ControlGroup(BDIP_TOOLBAR_NAME);

  if (btnType === 0) {
    const modelBtn = createModelleBtn({
      AV,
      btnName,
      iconClass,
      toolTip,
      callback,
    });
    targetToolbar.addControl(modelBtn, {
      index,
    });
    // const modelBtn = new AV.UI.Button(btnName);

    // modelBtn.setIcon(iconClass);
    // modelBtn.setToolTip(toolTip);
    // // https://lodash.com/docs/4.17.15#debounce
    // modelBtn.onClick = debounce(
    // 	function () {
    // 		const state = this.getState();

    // 		callback.call(this, ...arguments);
    // 		Number.parseInt(state) === 1 ? this.setState(0) : this.setState(1);
    // 	},
    // 	180,
    // 	{
    // 		leading: true,
    // 		trailing: false,
    // 	}
    // );

    // targetToolbar.addControl(modelBtn, {
    // 	index,
    // });
  } else {
    const btnGroup = new window.Autodesk.Viewing.UI.ComboButton(btnName);
    btnGroup.setIcon(iconClass);
    btnGroup.setToolTip(toolTip);

    btnList &&
      Array.isArray(btnList) &&
      btnList.forEach(({ btnName, iconClass, toolTip, callback }) => {
        const modelBtn = createModelleBtn({
          AV,
          btnName,
          iconClass,
          toolTip,
          callback,
          targetToolbar,
        });
        btnGroup.addControl(modelBtn);
      });

    targetToolbar.addControl(btnGroup, {
      index,
    });
  }

  !toolbar.getControl(toolbarName) && toolbar.addControl(targetToolbar);
};

export default addModelBtn;
