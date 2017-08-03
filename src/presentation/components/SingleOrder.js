import React, { Component } from 'react'

import Title from './Title'
import OrderBackContainer from '../containers/OrderBackContainer'
import OrderContainer from '../containers/OrderContainer'

class SingleOrder extends Component {
  render () {
    return (
      <div className='single-order'>
        <OrderBackContainer />
        <Title text='Order' />
        <OrderContainer />
      </div>
    )
  }
}

export default SingleOrder
