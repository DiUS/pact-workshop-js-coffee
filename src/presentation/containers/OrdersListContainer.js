import { connect } from 'react-redux'

import OrdersList from '../components/OrdersList'

const OrdersListContainer = connect(
  ({ orders }) => ({ orders })
)(OrdersList)

export default OrdersListContainer
