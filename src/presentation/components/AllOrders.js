import React, { Component } from 'react'

import Title from './Title'
import OrdersListContainer from '../containers/OrdersListContainer'

class AllOrders extends Component {
  render () {
    return (
      <div className='orders-all'>
        <Title text='All orders' />
        <OrdersListContainer />
      </div>
    )
  }
}

export default AllOrders
