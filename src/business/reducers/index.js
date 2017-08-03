import { combineReducers } from 'redux'

import selected from './selected'
import orders from './orders'
import order from './order'
import coffee from './coffee'
import menu from './menu'

const rootReducer = combineReducers({
  selected,
  orders,
  order,
  coffee,
  menu
})

export default rootReducer
