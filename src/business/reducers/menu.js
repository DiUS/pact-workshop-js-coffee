import { RECEIVE_MENU_COFFEE } from '../actions'

const initialState = {
  size: [],
  style: []
}

const menu = (state = initialState, action) => {
  switch (action.type) {

    case RECEIVE_MENU_COFFEE:
      return action.menu

    default:
      return state

  }
}

export default menu
