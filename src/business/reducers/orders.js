import { RECEIVE_ORDERS_LIST, RECEIVE_ORDER_RENAME_OK } from '../actions'

const findIndexById = (id, orders) => orders.findIndex(it => it.id === id)
const findOrderById = (id, orders) => orders.find(it => it.id === id)

const orders = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_ORDERS_LIST:
      return action.orders

    case RECEIVE_ORDER_RENAME_OK:
      const newState = state.map(it => ({ ...it }))
      const newOrder = { ...findOrderById(action.orderId, state), name: action.name }
      newState[findIndexById(action.orderId, newState)] = newOrder
      return newState

    default:
      return state

  }
}

export default orders
