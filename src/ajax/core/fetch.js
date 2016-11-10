/*
* @Author: fengyun2
* @Date:   2016-11-10 11:30:40
* @Last Modified by:   fengyun2
* @Last Modified time: 2016-11-10 16:17:46
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

export const fetchRequest = (url, options) => {
  let ori_options = {
    method: 'GET',
    mode: "no-cors",
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
    options.body = Object.assign({}, {body: ori_options.body}, {body: options.data})
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
    options.headers = Object.assign({}, {headers: ori_options.headers}, {headers: options.contentType})
    delete options.contentType
  }
  options = Object.assign({}, ori_options, options, {url: url})
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err)
}
