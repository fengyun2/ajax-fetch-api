import 'babel-polyfill'

// original-ajax

import ajax from './ajax/core/ajax'
import {getPromise} from './ajax/ajax-promise'
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