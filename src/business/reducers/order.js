import { RECEIVE_ORDER, RECEIVE_ORDER_RENAME_OK } from '../actions'

const order = (state = null, action) => {
  switch (action.type) {

    case RECEIVE_ORDER:
      return action.order

    case RECEIVE_ORDER_RENAME_OK:
      if (action.orderId === state.id) {
        return { ...state, name: action.name }
      } else {
        return state
      }

    default:
      return state

  }
}

export default order
