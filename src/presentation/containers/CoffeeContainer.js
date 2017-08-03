import { connect } from 'react-redux'

import Coffee from '../components/Coffee'

const CoffeeContainer = connect(
  ({ coffee, selected, menu }) => ({ coffee, orderId: selected.orderId, menu })
)(Coffee)

export default CoffeeContainer
