import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config'

const mimeJson = 'application/json'
const headers = { 'Content-Type': mimeJson, 'Accept': mimeJson }
const GET = 'GET'
const POST = 'POST'
const PATCH = 'PATCH'
const DELETE = 'DELETE'

const transformBody = (body) => {
  if (body) {
    return JSON.stringify(body)
  }
  return null
}
const wrapRequest = (url, method = GET, body = null) =>
  fetch(url, { method, headers, body: transformBody(body) })
  .then((resp) => {
    const json = resp.json()
    if (resp.status >= 400) {
      return json.then((errorJson) => {
        const error = {
          status: resp.status,
          message: errorJson.message
        }
        throw error
      })
    } else {
      return json
    }
  })

const CoffeeShop = (url = baseUrl) => ({

  // orders
  listOrders: () => wrapRequest(`${url}/order`),
  addOrder: () => wrapRequest(`${url}/order`, POST),
  getOrder: (orderId) => wrapRequest(`${url}/order/${orderId}`),
  cancelOrder: (orderId) => wrapRequest(`${url}/order/${orderId}`, DELETE),
  nameOrder: (orderId, name) => wrapRequest(`${url}/order/${orderId}`, PATCH, { name }),

  // coffees
  addCoffee: (orderId, style = 'Latte') => wrapRequest(`${url}/order/${orderId}/coffee`, POST, { style }),
  getCoffee: (orderId, coffeeId) => wrapRequest(`${url}/order/${orderId}/coffee/${coffeeId}`),
  cancelCoffee: (orderId, coffeeId) => wrapRequest(`${url}/order/${orderId}/coffee/${coffeeId}`, DELETE),
  updateCoffee: (orderId, coffeeId, attribs) => wrapRequest(`${url}/order/${orderId}/coffee/${coffeeId}`, PATCH, attribs),

  // menu
  getMenu: () => wrapRequest(`${url}/menu`),
  getCoffeeMenu: () => wrapRequest(`${url}/menu/coffee`)

})

export default CoffeeShop
