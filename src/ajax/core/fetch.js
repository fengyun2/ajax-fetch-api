/**
 * fetch请求
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
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err)
}