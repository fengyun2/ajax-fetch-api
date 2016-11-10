import ajax from './core/ajax'

export const getPromise = url => {
  return new Promise((resolve, reject) => {
    ajax(url, response => {
      resolve(JSON.parse(response))
    })
  })
}