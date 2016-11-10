/*
* @Author: fengyun2
* @Date:   2016-11-10 11:30:40
* @Last Modified by:   fengyun2
* @Last Modified time: 2016-11-10 15:48:42
*/

import ajax from './core/ajax'

/**
 * 封装好的 promise+ajax
 * @param  string url     api接口地址
 * @param  object options 请求参数
 * @return promise
 */
export const getPromise = (url, options) => {
  return new Promise((resolve, reject) => {
    ajax(url, options, response => {
      resolve(JSON.parse(response))
    })
  })
}

/**
 * 封装好的 promise+ajax
 * @param  string url     api接口地址
 * @param  object options 请求参数
 * @return promise
 */
export const postPromise = (url, options) => {
  return new Promise((resolve, reject) => {
    ajax(url, options, response => {
      resolve(JSON.parse(response))
    })
  })
}
