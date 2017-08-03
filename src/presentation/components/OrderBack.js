import React, { Component } from 'react'

import actions from '../../business/actions'

class OrderBack extends Component {

  back () {
    actions.deselectOrder(this.props.dispatch)
  }

  render () {
    return (
      <h1 className='title nav-back' onClick={(e) => this.back(e)}>‹</h1>
    )
  }

}

export default OrderBack
