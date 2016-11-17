/*
* @Author: fengyun2
* @Date:   2016-11-10 11:30:40
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-11-17 23:50:16
*/

/**
 * 封装fetch请求
 * fetch.js
 */

import 'isomorphic-fetch'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function parseJSON(response) {
  return response.json()
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

  let arr = []
  let i = 0
  for (let attr in obj) {
    arr[i] = encodeURIComponent(attr) + '=' + encodeURIComponent(obj[attr])
    i++
  }
  return arr.join('&')
}

function getDataFormat(url, data) {
  url += (url.indexOf('?') === -1)
    ? '?'
    : '&'
  if (!!data) {
    for (let prop in data) {
      url += encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop])
    }
  }
  return url
}

export const fetchRequest = (url, options) => {
  let ori_options = {
    method: 'GET',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {}
  }
  if (!!options && !!options.data) {
    if (typeof options.data !== 'object') {
      console.error('data参数必须是对象')
      return
    }
    options.body = options.data

    console.log(`body >>>`, options)
    delete options.data
  }
  if (!!options && !!options.type) {
    if (typeof options.type !== 'string') {
      console.error('type参数必须是字符串')
      return
    }
    options.method = options.type
    delete options.type
  }
  if (!!options && !!options.contentType) {
    if (typeof options.contentType !== 'string' || typeof options.contentType !== 'object') {
      console.error('contentType参数必须是字符串或者对象')
      return
    }
    options.headers = Object.assign({}, {
      headers: ori_options.headers
    }, {headers: options.contentType})
    delete options.contentType
  }
  options = Object.assign({}, ori_options, options, {url: url})

  if (options.method.toUpperCase() === 'POST') {
    options.body = postDataFormat(options.body)
  } else {
    url = getDataFormat(url, options.body)
    delete options.body
  }

  console.log(`after >>>`, options)
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err)
}
