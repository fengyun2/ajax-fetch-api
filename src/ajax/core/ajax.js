/*
* @Author: fengyun2
* @Date:   2016-11-10 11:30:40
* @Last Modified by:   fengyun2
* @Last Modified time: 2016-11-10 15:50:20
*/

/**
 * 原生ajax接口(包括get/post)
 * ajax.js
 */

/**
 * 创建必须的xhr
 * @param  {[type]}   url      [description]
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const createXHR = (url, options, callback = () => {}) => {
  let ori_options = {
    type: 'GET',
    url: '',
    contentType: 'application/x-www-form-urlencoded',
    data: ''
  }
  options = Object.assign({}, ori_options, options, {url: url})
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
    if (xhr.readyState < 4 || xhr.status !== 200) {
      return new Error('Something bad happened!')
    }
    if (xhr.readyState === 4 && typeof callback === 'function') {
      callback(xhr.response)
    }
  }
  xhr.open(options.type, options.url, true)
  xhr.setRequestHeader('Content-Type', options.contentType)
  xhr.send(options.data)
  // xhr.open('GET', url, true) xhr.setRequestHeader('Content-Type',
  // 'application/x-www-form-urlencoded') xhr.send('')
}

/**
 * getRequest
 * @param  {[type]}   url      [description]
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export const getRequest = (url, options, callback) => {
  url += (url.indexOf('?') === -1)
    ? '?'
    : '&'
  if (!!options && !!options.data) {
    for (let prop in options.data) {
      url += encodeURIComponent(prop) + '=' + encodeURIComponent(options.data[prop])
    }
  }
  if (!!options && typeof options === 'function') {
    callback = options
  } else if (!callback || typeof callback !== 'function') {
    callback = () => {}
  }
  options = Object.assign({}, options, {type: 'GET'})
  createXHR(url, options, callback)
}

/**
 * postRequest
 * @param  {[type]}   url      [description]
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export const postRequest = (url, options, callback) => {
  if (!!options && !!options.data) {
    options.data = postDataFormat(options.data)
  }
  if (!!options && typeof options === 'function') {
    callback = options
  } else if (!callback || typeof callback !== 'function') {
    callback = () => {}
  }
  options = Object.assign({}, options, {type: 'POST'})
  createXHR(url, options, callback)
}

/**
 * 格式化post 传递的数据
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function postDataFormat(obj) {
  if (typeof obj !== 'object') {
    console.error('入的参数必须是对象')
    return
  }

  // 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的bkit）
  if (typeof FormData === 'function') {
    let data = new FormData()
    for (let attr in obj) {
      data.append(attr, obj[attr])
    }
    return data
  } else {
    // 不支持FormData的浏览器的处理
    let arr = new Array()
    let i = 0
    for (let attr in obj) {
      arr[i] = encodeURIComponent(attr) + '=' + encodeURIComponent(obj[attr])
      i++
    }
    return arr.join('')
  }
}

export default getRequest
