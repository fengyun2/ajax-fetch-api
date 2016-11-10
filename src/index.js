/**
 * demo
 */
import 'babel-polyfill'

// original-ajax

import ajax from './ajax/core/ajax'
import {getPromise, postPromise} from './ajax/ajax-promise'
import {fetchRequest} from './ajax/core/fetch'

// original
ajax('./data/data.json', data => {
  console.log('AJAX/data >>>', JSON.parse(data))

  ajax('./data/users.json', users => {
    console.log('AJAX/users >>>', JSON.parse(users))

    ajax('./data/products.json', products => {
      console.log('AJAX/products', JSON.parse(products))
    })
  })
})

// promise
getPromise('./data/data.json').then(data => {
  console.log('Promises/data >>>', data)
})

getPromise('./data/users.json').then(users => {
  console.log('Promises/users >>>', users)
})
// postPromise('./data/users.json', {data: {username: 'ly', age: 20, sex: 'male'}}).then(users => {
//   console.log('Promises/users >>>', users)
// })

getPromise('./data/products.json').then(products => {
  console.log('Promises/products', products)
})

// Parallel operations with promises
Promise.all([
  getPromise('./data/data.json'),
  getPromise('./data/users.json'),
  getPromise('./data/products.json'),
])
.then(data => {
  console.log('Parallel promises >>>', data)
})

fetchRequest('./data/data.json')
.then(data => {
  console.log('Promise+fetch/data', data)
})

// async await

;(async () => {
  let data = await fetchRequest('./data/data.json')
  let users = await fetchRequest('./data/users.json')
  let products = await fetchRequest('./data/products.json')

  console.log('ES7 Async/data >>>', data)
  console.log('ES7 Async/users >>>', users)
  console.log('ES7 Async/products >>>', products)

  // Parallel operations with async + fetch

  let parallelDataFetch = Promise.all([
    await fetchRequest('./data/data.json'),
    await fetchRequest('./data/users.json'),
    await fetchRequest('./data/products.json')
  ]).then(data => {
    console.log('Async parallel+fetch >>>', data)
  })
})()

