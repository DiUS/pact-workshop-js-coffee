import CoffeeShop from '../../data/service/CoffeeShop'

export const SELECT_ORDER = 'SELECT_ORDER'
export const DESELECT_ORDER = 'DESELECT_ORDER'

export const SELECT_COFFEE = 'SELECT_COFFEE'
export const DESELECT_COFFEE = 'DESELECT_COFFEE'

export const REQUEST_MENU_COFFEE = 'REQUEST_MENU_COFFEE'
export const RECEIVE_MENU_COFFEE = 'RECEIVE_MENU_COFFEE'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

export const REQUEST_ORDER = 'REQUEST_ORDER'
export const RECEIVE_ORDER = 'RECEIVE_ORDER'

export const REQUEST_ORDER_CANCEL = 'REQUEST_ORDER_CANCEL'
export const RECEIVE_ORDER_CANCEL_OK = 'RECEIVE_ORDER_CANCEL_OK'

export const REQUEST_ORDER_ADD = 'REQUEST_ORDER_ADD'
export const RECEIVE_ORDER_ADD_OK = 'RECEIVE_ORDER_ADD_OK'

export const REQUEST_ORDER_RENAME = 'REQUEST_ORDER_RENAME'
export const RECEIVE_ORDER_RENAME_OK = 'RECEIVE_ORDER_RENAME_OK'

export const REQUEST_COFFEE = 'REQUEST_COFFEE'
export const RECEIVE_COFFEE = 'RECEIVE_COFFEE'

export const REQUEST_COFFEE_CANCEL = 'REQUEST_COFFEE_CANCEL'
export const RECEIVE_COFFEE_CANCEL_OK = 'RECEIVE_COFFEE_CANCEL_OK'

export const REQUEST_COFFEE_ADD = 'REQUEST_COFFEE_ADD'
export const RECEIVE_COFFEE_ADD_OK = 'RECEIVE_COFFEE_ADD_OK'

export const REQUEST_COFFEE_SET_STYLE = 'REQUEST_COFFEE_SET_STYLE'
export const RECEIVE_COFFEE_SET_STYLE_OK = 'RECEIVE_COFFEE_SET_STYLE_OK'

export const REQUEST_COFFEE_SET_SIZE = 'REQUEST_COFFEE_SET_SIZE'
export const RECEIVE_COFFEE_SET_SIZE_OK = 'RECEIVE_COFFEE_SET_SIZE_OK'

const actions = {
  coffee: {
    select: (coffeeId) => ({ type: SELECT_COFFEE, coffeeId }),
    deselect: () => ({ type: DESELECT_COFFEE }),

    request: (orderId, coffeeId) => ({ type: REQUEST_COFFEE, orderId, coffeeId }),
    receive: (coffee) => ({ type: RECEIVE_COFFEE, coffee }),

    cancel: (orderId, coffeeId) => ({ type: REQUEST_COFFEE_CANCEL, orderId, coffeeId }),
    cancelOk: () => ({ type: RECEIVE_COFFEE_CANCEL_OK }),

    add: (orderId) => ({ type: REQUEST_COFFEE_ADD, orderId }),
    addOk: (coffee) => ({ type: RECEIVE_COFFEE_ADD_OK, coffee }),

    setStyle: (orderId, coffeeId, style) => ({ type: REQUEST_COFFEE_SET_STYLE, orderId, coffeeId, style }),
    setStyleOk: (coffeeId, style) => ({ type: RECEIVE_COFFEE_SET_STYLE_OK, coffeeId, style }),

    setSize: (orderId, coffeeId, size) => ({ type: REQUEST_COFFEE_SET_SIZE, orderId, coffeeId, size }),
    setSizeOk: (coffeeId, size) => ({ type: RECEIVE_COFFEE_SET_SIZE_OK, coffeeId, size })
  },

  order: {
    select: (orderId) => ({ type: SELECT_ORDER, orderId }),
    deselect: () => ({ type: DESELECT_ORDER }),

    request: (orderId) => ({ type: REQUEST_ORDER, orderId }),
    receive: (order) => ({ type: RECEIVE_ORDER, order }),

    cancel: (orderId) => ({ type: REQUEST_ORDER_CANCEL, orderId }),
    cancelOk: () => ({ type: RECEIVE_ORDER_CANCEL_OK }),

    add: () => ({ type: REQUEST_ORDER_ADD }),
    addOk: (order) => ({ type: RECEIVE_ORDER_ADD_OK, order }),

    rename: (orderId, name) => ({ type: REQUEST_ORDER_RENAME, orderId, name }),
    renameOk: (orderId, name) => ({ type: RECEIVE_ORDER_RENAME_OK, orderId, name })
  },

  ordersList: {
    request: () => ({ type: REQUEST_ORDERS_LIST }),
    receive: (orders) => ({ type: RECEIVE_ORDERS_LIST, orders })
  },

  menu: {
    coffee: {
      request: () => ({ type: REQUEST_MENU_COFFEE }),
      receive: (menu) => ({ type: RECEIVE_MENU_COFFEE, menu })
    }
  }
}

const toExport = {}

const refreshOrdersList = (dispatch) => {
  toExport.fetchOrdersList(dispatch)
}

const refreshOrder = (dispatch, orderId) => {
  dispatch(actions.order.receive(null))
  toExport.fetchOrder(dispatch, orderId)
}

toExport.selectOrder = (dispatch, orderId) => {
  dispatch(actions.order.select(orderId))
  toExport.fetchOrder(dispatch, orderId)
}

toExport.deselectOrder = (dispatch) => {
  refreshOrdersList(dispatch)
  dispatch(actions.order.deselect())
  dispatch(actions.order.receive(null))
}

toExport.selectCoffee = (dispatch, orderId, coffeeId) => {
  dispatch(actions.coffee.select(orderId, coffeeId))
  toExport.fetchCoffee(dispatch, orderId, coffeeId)
}

toExport.deselectCoffee = (dispatch) => {
  dispatch(actions.coffee.deselect())
  dispatch(actions.coffee.receive(null))
}

const service = CoffeeShop()

toExport.fetchCoffeeMenu = (dispatch) => {
  dispatch(actions.menu.coffee.request())
  return service.getCoffeeMenu()
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      return dispatch(actions.menu.coffee.receive(json))
    })
}

toExport.fetchOrdersList = (dispatch) => {
  dispatch(actions.ordersList.request())
  return service.listOrders()
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      return dispatch(actions.ordersList.receive(json.orders))
    })
}

toExport.addOrder = (dispatch) => {
  dispatch(actions.order.add())
  return service.addOrder()
    .catch((error) => {
      console.log(error)
      toExport.deselectOrder(dispatch)
      return null
    })
    .then((json) => {
      if (json) {
        dispatch(actions.order.addOk(json))
        refreshOrdersList(dispatch)
        return toExport.selectOrder(dispatch, json.id)
      }
    })
}

toExport.fetchOrder = (dispatch, orderId) => {
  dispatch(actions.order.request(orderId))
  return service.getOrder(orderId)
    .catch((error) => {
      console.log(error)
      toExport.deselectOrder(dispatch)
      return null
    })
    .then((json) => {
      return dispatch(actions.order.receive(json))
    })
}

toExport.cancelOrder = (dispatch, orderId) => {
  dispatch(actions.order.cancel(orderId))
  return service.cancelOrder(orderId)
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      if (json) {
        toExport.deselectOrder(dispatch)
        refreshOrdersList(dispatch)
        return dispatch(actions.order.cancelOk())
      }
    })
}

toExport.renameOrder = (dispatch, orderId, name) => {
  dispatch(actions.order.rename(orderId, name))
  return service.nameOrder(orderId, name)
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      if (json) {
        return dispatch(actions.order.renameOk(orderId, name))
      }
    })
}

toExport.addCoffee = (dispatch, orderId) => {
  dispatch(actions.coffee.add(orderId))
  return service.addCoffee(orderId)
    .catch((error) => {
      console.log(error)
      toExport.deselectCoffee(dispatch)
      return null
    })
    .then((json) => {
      if (json) {
        dispatch(actions.coffee.addOk(json))
        refreshOrder(dispatch, orderId)
        return toExport.selectCoffee(dispatch, orderId, json.id)
      }
    })
}

toExport.fetchCoffee = (dispatch, orderId, coffeeId) => {
  dispatch(actions.coffee.request(orderId, coffeeId))
  return service.getCoffee(orderId, coffeeId)
    .catch((error) => {
      console.log(error)
      toExport.deselectCoffee(dispatch)
      return null
    })
    .then((json) => {
      return dispatch(actions.coffee.receive(json))
    })
}

toExport.cancelCoffee = (dispatch, orderId, coffeeId) => {
  dispatch(actions.coffee.cancel(orderId, coffeeId))
  return service.cancelCoffee(orderId, coffeeId)
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      if (json) {
        toExport.deselectCoffee(dispatch)
        refreshOrder(dispatch, orderId)
        return dispatch(actions.coffee.cancelOk())
      }
    })
}

toExport.setCoffeeStyle = (dispatch, orderId, coffeeId, style) => {
  dispatch(actions.coffee.setStyle(orderId, coffeeId, style))
  return service.updateCoffee(orderId, coffeeId, { style })
    .catch((error) => {
      console.log(error)
      toExport.deselectCoffee(dispatch)
      return null
    })
    .then((json) => {
      if (json) {
        refreshOrder(dispatch, orderId)
        return dispatch(actions.coffee.setStyleOk(coffeeId, style))
      }
    })
}

toExport.setCoffeeSize = (dispatch, orderId, coffeeId, size) => {
  dispatch(actions.coffee.setSize(orderId, coffeeId, size))
  return service.updateCoffee(orderId, coffeeId, { size })
    .catch((error) => {
      console.log(error)
      toExport.deselectCoffee(dispatch)
      return null
    })
    .then((json) => {
      if (json) {
        refreshOrder(dispatch, orderId)
        return dispatch(actions.coffee.setSizeOk(coffeeId, size))
      }
    })
}

export default toExport
