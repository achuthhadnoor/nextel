'use strict'

// Packages
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({ children, type, onClick, color }) => {
  const classnames = classNames(color)

  return (
    <button className={classnames} type={type} onClick={onClick}>
      {children}

      <style jsx>{`
        button {
          width: 100%;
          height: 40px;
          background-color: #fff;
          color: #000;
          border: none;
          font-weight: 200;
          font-size: 1em;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          outline: none;
        }
        .dark {
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </button>
  )
}

Button.defaultProps = {
  onClick: null,
  type: 'button'
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func
}

export default Button