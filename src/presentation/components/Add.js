import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Add extends Component {

  render () {
    return (
      <h2 className='add-button' onClick={this.props.onClick}>
        {this.props.label}
      </h2>
    )
  }

}

Add.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Add
