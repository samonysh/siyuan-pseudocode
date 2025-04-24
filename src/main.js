import { getBlockAttrAPI, addBlockAttrAPI } from "./utils/api.js";

/**
 * 获取当前挂件id
 * @returns 
 */
export function getCurrentWidgetId(){
  try{
      return window.frameElement.parentElement.parentElement.dataset.nodeId;
  }catch(err){
      console.warn("getCurrentWidgetId window...nodeId方法失效");
      return null;
  }
}

let g_thisWidgetId;

try {
  g_thisWidgetId = getCurrentWidgetId();
  // 输入Latex格式的代码
  const inputText = document.getElementById("input-text");
  // 按钮
  // 显示行号
  const lineNumber = document.getElementById("line-number");
  const lineNumberContainer = document.getElementById("line-number-container");
  // 显示块结束符
  const blockEnding = document.getElementById("block-ending");
  const blockEndingContainer = document.getElementById("block-ending-container");
  // 提交与修改
  const submit = document.getElementById("submit");
  const modify = document.getElementById("modify");
  // 输出
  const outputContainer = document.getElementById("output-container");

  // 页面加载时，尝试从LocalStorage中读取内容并显示
  window.onload = async function () {
    // 获取保存的内容
    const savedContent = await getBlockAttrAPI(g_thisWidgetId);
    if (savedContent.data["custom-latex-code"]) {
      // 生成 pre 标签，设置内容
      let outputCode = document.createElement("pre");
      outputCode.textContent = savedContent.data["custom-latex-code"];
      lineNumber.checked = JSON.parse(savedContent.data["custom-line-number"]);
      blockEnding.checked = JSON.parse(savedContent.data["custom-block-ending"]);

      outputCode.className = "pseudocode";
      outputCode.id = "output-code";
      outputCode.style.display = "block";
      // 将 pre 标签添加到 outputContainer 中
      outputContainer.appendChild(outputCode);
      // 设置按钮显示和隐藏
      inputText.style.display = "none";
      modify.style.display = "block";
      lineNumberContainer.style.display = "none";
      blockEndingContainer.style.display = "none";
      submit.style.display = "none";
      // 渲染伪代码
      pseudocode.renderElement(document.getElementById("output-code"), {
        lineNumber: lineNumber.checked,
        noEnd: !blockEnding.checked,
      });
    }
  };

  /**
   * 异步函数 getCode 用于获取和处理LaTeX格式的代码输入
   * 该函数首先从输入框中获取LaTeX代码，然后通过API调用将代码保存
   * 接着，它创建一个用于显示代码的HTML元素，并根据用户选择的选项渲染代码
   * 最后，它调整界面元素的显示状态，以反映代码已成功提交和渲染的状态
   */
  async function getCode() {
    // 获取输入的Latex格式的代码
    const inputTextValue = inputText.value;
    // 将输入的代码保存到本地存储中
    let codeResponse = await addBlockAttrAPI(
      {
        "custom-latex-code": inputTextValue,
      },
      g_thisWidgetId
    );
    let lineNumberResponse = await addBlockAttrAPI(
      {
        "custom-line-number": JSON.stringify(lineNumber.checked),
      },
      g_thisWidgetId
    );
    let blockEndingResponse = await addBlockAttrAPI(
      {
        "custom-block-ending": JSON.stringify(blockEnding.checked),
      },
      g_thisWidgetId
    );

    // 生成 pre 标签，设置内容
    let outputCode = document.createElement("pre");
    outputCode.textContent = inputTextValue;
    outputCode.className = "pseudocode";
    outputCode.id = "output-code";
    outputCode.style.display = "block";
    // 将 pre 标签添加到 outputContainer 中
    outputContainer.appendChild(outputCode);
    // 设置按钮显示和隐藏
    inputText.style.display = "none";
    modify.style.display = "block";
    lineNumberContainer.style.display = "none";
    blockEndingContainer.style.display = "none";
    submit.style.display = "none";
    // 渲染伪代码
    pseudocode.renderElement(document.getElementById("output-code"), {
      lineNumber: lineNumber.checked,
      noEnd: !blockEnding.checked,
    });
  }

  // 提交 点击 监听事件
  submit.addEventListener("click", getCode);

  // 修改 点击 监听事件
  modify.addEventListener("click", async () => {
    // 清空 outputContainer
    outputContainer.innerHTML = "";
    // 获取保存的内容
    const savedContent = await getBlockAttrAPI(g_thisWidgetId);
    // 如果有保存的内容，设置到输入框中
    if (savedContent.data["custom-latex-code"]) {  
      inputText.value = savedContent.data["custom-latex-code"];
      lineNumber.checked = JSON.parse(savedContent.data["custom-line-number"]);
      blockEnding.checked = JSON.parse(savedContent.data["custom-block-ending"]);
    }
    // 设置按钮显示与隐藏
    inputText.style.display = "block";
    lineNumberContainer.style.display = "block";
    blockEndingContainer.style.display = "block";
    submit.style.display = "block";
    modify.style.display = "none";
  });
} catch (error) {
  console.log(error);
}
