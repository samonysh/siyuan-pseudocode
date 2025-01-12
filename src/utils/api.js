import { config } from "./config.js";

//向思源api发送请求
/**
 * 发起一个POST请求
 * 
 * 该函数使用fetch API发起一个POST请求，并处理响应结果它将请求数据序列化为JSON格式，
 * 并设置请求头为POST请求，同时包含授权令牌和内容类型
 * 
 * @param {Object} data - 请求体数据，将被序列化为JSON格式
 * @param {string} url - 请求的URL地址
 * @returns {Promise<Object>} - 返回一个Promise，解析为响应的JSON数据
 */
export async function postRequest(data, url) {
  let result;
  // 发起POST请求，并处理响应
  await fetch(url, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Authorization: "Token " + config.token,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    // 将响应解析为JSON格式
    result = response.json();
  });
  // 返回解析后的结果
  return result;
}

/**
 * 检查响应状态的异步函数
 * 该函数用于判断API或其他请求的响应状态是否成功
 * 
 * @param {Object} response - 响应对象，应包含表示状态的code属性
 * @returns {Promise<number>} - 返回一个Promise，状态码为0表示成功，-1表示失败
 */
export async function checkResponse(response) {
  // 检查响应状态码是否为0，0表示成功
  if (response.code == 0) {
    // 成功时返回0
    return 0;
  } else {
    // 失败时返回-1
    return -1;
  }
}

/**
 * 异步函数，用于获取指定挂件块的属性信息
 * 该函数通过API请求获取挂件块的参数，以便在当前组件中使用
 * 
 * @param {number} blockId - 可选参数，默认为当前组件的ID，指定需要获取属性的挂件块ID
 * @returns {Promise<Object>} 返回一个Promise，解析为包含挂件块属性的响应对象
 * @throws {Error} 如果API请求失败或返回错误码非0，则抛出错误
 */
export async function getBlockAttrAPI(blockId = thisWidgetId) {
  // 定义API请求的URL
  const url = "/api/attr/getBlockAttrs";
  // 发起API请求，传递挂件块ID和请求URL，等待响应结果
  const response = await postRequest({ id: blockId }, url);
  // 检查响应状态码，如果非0，则表示请求失败，抛出错误
  if (response.code != 0) {
    throw Error("获取挂件块参数失败");
  }
  // 返回API请求的响应结果
  return response;
}

/**
 * 异步函数，用于向特定区块添加属性
 * 该函数通过POST请求调用API以设置区块的属性
 * 
 * @param {Object} attrs - 要添加到区块的属性对象
 * @param {string} [blockId=thisWidgetId] - 可选参数，指定要添加属性的区块ID，默认为当前小部件ID
 * @returns {Promise} - 返回一个Promise对象，它在API调用完成后解析为API响应的结果
 */
export async function addBlockAttrAPI(attrs, blockId = thisWidgetId) {
  // 定义API请求的URL
  let url = "/api/attr/setBlockAttrs";
  
  // 构造请求体，包含区块ID和要设置的属性
  let attr = {
    id: blockId,
    attrs: attrs,
  };
  
  // 发送POST请求并等待结果
  let result = await postRequest(attr, url);
  
  // 检查并返回API响应的结果
  return checkResponse(result);
}
