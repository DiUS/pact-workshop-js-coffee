import React, { Component } from 'react'

import actions from '../../business/actions'

class CoffeeBack extends Component {

  back () {
    actions.deselectCoffee(this.props.dispatch)
  }

  render () {
    return (
      <h1 className='title nav-back' onClick={(e) => this.back(e)}>‹</h1>
    )
  }

}

export default CoffeeBack
