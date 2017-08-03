import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Title extends Component {
  render () {
    return (<h1 className='title'>{this.props.text}</h1>)
  }
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}

export default Title
