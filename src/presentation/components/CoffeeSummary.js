import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DeleteX from './DeleteX'
import actions from '../../business/actions'

class CoffeeSummary extends Component {

  select () {
    actions.selectCoffee(this.props.dispatch, this.props.orderId, this.props.id)
  }

  cancel () {
    actions.cancelCoffee(this.props.dispatch, this.props.orderId, this.props.id)
  }

  render () {
    return (
      <div className='coffee-summary card' onClick={(e) => this.select(e)}>
        <DeleteX onClick={(e) => this.cancel(e)} />
        <div className='coffee-summary'>{this.props.summary}</div>
      </div>
    )
  }

}

CoffeeSummary.propTypes = {
  id: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired
}

export default CoffeeSummary
