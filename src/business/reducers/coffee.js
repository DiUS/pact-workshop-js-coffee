import {
  RECEIVE_COFFEE,
  RECEIVE_COFFEE_SET_STYLE_OK,
  RECEIVE_COFFEE_SET_SIZE_OK
} from '../actions'

const order = (state = null, action) => {
  switch (action.type) {

    case RECEIVE_COFFEE:
      return action.coffee

    case RECEIVE_COFFEE_SET_STYLE_OK:
      const { style } = action
      return { ...state, style }

    case RECEIVE_COFFEE_SET_SIZE_OK:
      const { size } = action
      return { ...state, size }

    default:
      return state

  }
}

export default order
