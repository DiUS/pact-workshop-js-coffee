import React, { Component } from 'react'
import PropTypes from 'prop-types'

const capitalise = (value) => value.charAt(0).toUpperCase() + value.slice(1)

class DropDown extends Component {

  render () {
    const { name, value, options, onChange } = this.props
    return (
      <form className='select-card'>
        <span className='form-label'>{capitalise(name)}:</span>
        <select
          name={name}
          className={`coffee-${name} select-card`}
          value={value}
          onChange={(e) => onChange(e)}
        >
          <option key='empty' />
          {options.map(it => (
            <option key={it}>{it}</option>
          ))}
        </select>
      </form>
    )
  }

}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired
}

export default DropDown
