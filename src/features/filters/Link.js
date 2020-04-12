import React from 'react'
import PropTypes from 'prop-types'


const Link = ({ active, children, setVisibilityFilter, filter }) => (
  <button
    className="btn btn-info btn-block"
    href="#"
    onClick={() => {
      setVisibilityFilter(filter)
    }}
    disabled={active}
  >
    <b>{children}</b>
  </button>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}

export default Link
