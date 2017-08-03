import { connect } from 'react-redux'

import Order from '../components/Order'

const OrderContainer = connect(
  ({ order, selected }) => ({ coffees: order ? order.coffees : null, id: selected.orderId })
)(Order)

export default OrderContainer
