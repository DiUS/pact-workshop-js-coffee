import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'

import Add from './Add'
import CoffeeSummary from './CoffeeSummary'
import Loading from './Loading'
import OrderNameContainer from '../containers/OrderNameContainer'

class Order extends Component {

  addCoffee () {
    actions.addCoffee(this.props.dispatch, this.props.id)
  }

  render () {
    const { coffees, id, dispatch } = this.props
    if (!coffees) {
      return (<Loading />)
    }

    return (
      <div className='order'>
        <OrderNameContainer />
        <div className='coffees-list'>
          {coffees.map((it, i) =>
            <CoffeeSummary {...it} orderId={id} dispatch={dispatch} key={i} />
          )}
        </div>
        <Add label='Add coffee' onClick={(e) => this.addCoffee(e)} />
      </div>
    )
  }

}

Order.propTypes = {
  coffees: PropTypes.arrayOf(PropTypes.shape({
    summary: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  id: PropTypes.number.isRequired
}

export default Order
