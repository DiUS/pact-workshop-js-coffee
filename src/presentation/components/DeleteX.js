import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DeleteX extends Component {

  render () {
    return (<span className='delete-card' onClick={this.props.onClick}>✕</span>)
  }

}

DeleteX.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteX
