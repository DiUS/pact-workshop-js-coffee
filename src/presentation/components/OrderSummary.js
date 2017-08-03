import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DeleteX from './DeleteX'
import actions from '../../business/actions'

class OrderSummary extends Component {

  select () {
    actions.selectOrder(this.props.dispatch, this.props.id)
  }

  cancel () {
    actions.cancelOrder(this.props.dispatch, this.props.id)
  }

  render () {
    const { name, coffeeSummaries: summaries } = this.props
    return (
      <div className='order-summary card' onClick={(e) => this.select(e)}>
        <DeleteX onClick={(e) => this.cancel(e)} />
        <div className='order-name'>{name}</div>
        {summaries.map((it, i) =>
          <div className='order-coffee-summary' key={i}>{it}</div>
        )}
      </div>
    )
  }

}

OrderSummary.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coffeeSummaries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default OrderSummary
