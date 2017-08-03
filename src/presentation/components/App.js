import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'
import AllOrders from './AllOrders'
import SingleOrder from './SingleOrder'
import SingleCoffee from './SingleCoffee'

class App extends Component {

  componentDidMount () {
    this.fetchOrdersList()
    this.fetchMenu()
  }

  fetchOrdersList () {
    actions.fetchOrdersList(this.props.dispatch)
  }

  fetchMenu () {
    actions.fetchCoffeeMenu(this.props.dispatch)
  }

  render () {
    const { orderId, coffeeId } = this.props
    if (coffeeId) {
      return (<SingleCoffee />)
    }

    if (orderId) {
      return (<SingleOrder />)
    }

    return (<AllOrders />)
  }

}

App.propTypes = {
  orderId: PropTypes.number,
  coffeeId: PropTypes.number
}

export default App
