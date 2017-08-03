import React, { Component } from 'react'

import Title from './Title'
import CoffeeBackContainer from '../containers/CoffeeBackContainer'
import CoffeeContainer from '../containers/CoffeeContainer'

class SingleCoffee extends Component {
  render () {
    return (
      <div className='coffee'>
        <CoffeeBackContainer />
        <Title text='Coffee' />
        <CoffeeContainer />
      </div>
    )
  }
}

export default SingleCoffee
