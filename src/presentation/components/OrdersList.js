import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'

import Add from './Add'
import OrderSummary from './OrderSummary'

class OrdersList extends Component {

  addOrder () {
    actions.addOrder(this.props.dispatch)
  }

  render () {
    return (
      <div className='orders'>
        <div className='orders-list'>
          {this.props.orders.map((it, i) =>
            <OrderSummary {...it} dispatch={this.props.dispatch} key={i} />
          )}
        </div>
        <Add label='New order' onClick={(e) => this.addOrder(e)} />
      </div>
    )
  }

}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    coffeeSummaries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired
}

export default OrdersList
