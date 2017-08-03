import { connect } from 'react-redux'

import OrderName from '../components/OrderName'

const OrderNameContainer = connect(
  ({ order }) => ({ ...order })
)(OrderName)

export default OrderNameContainer
