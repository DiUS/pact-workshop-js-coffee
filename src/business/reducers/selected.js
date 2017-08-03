import {
  SELECT_ORDER, DESELECT_ORDER,
  SELECT_COFFEE, DESELECT_COFFEE
} from '../actions'

const initialState = {
  orderId: null,
  coffeeId: null
}

const selected = (state = initialState, action) => {
  switch (action.type) {

    case SELECT_ORDER:
      return { ...state, orderId: action.orderId }

    case DESELECT_ORDER:
      return { ...state, orderId: null }

    case SELECT_COFFEE:
      return { ...state, coffeeId: action.coffeeId }

    case DESELECT_COFFEE:
      return { ...state, coffeeId: null }

    default:
      return state

  }
}

export default selected
