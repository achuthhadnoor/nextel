'use strict'

// Packages
import classNames from 'classnames'
import PropTypes from 'prop-types'
// import reactHashAvatar from 'react-hash-avatar'
// import renderHTML from 'react-render-html'

const Input = ({
  name,
  label,
  multiline,
  type,
  placeholder,
  success,
  error,
  hint,
  size,
  value,
  autoFocus,
  onChange,
  readOnly,
  hasProject
}) => {
  const classnames = classNames(size)

  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>

      {multiline ? (
        <textarea
          name={name}
          id={name}
          className={classnames}
          rows="1"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          readOnly={readOnly}
        />
      ) : (
        <input
          name={name}
          id={name}
          className={classnames}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          readOnly={readOnly}
        />
      )}

      {(hint || error || success) && <p>{success || error || hint}</p>}

      <style jsx>{`
        div {
          width: 100%;
          position: relative;
          margin-bottom: 25px;
          transition: all 0.2s;
        }
        div:hover p {
          opacity: 1;
        }
        div:hover input,
        div:hover textarea {
          color: #fff;
        }
        div:hover input::-webkit-input-placeholder {
          color: #fff;
        }
        div:hover input::-moz-placeholder {
          color: #fff;
        }
        div:hover input:-ms-input-placeholder {
          color: #fff;
        }
        div:hover input:-moz-placeholder {
          color: #fff;
        }
        div:hover textarea::-webkit-input-placeholder {
          color: #fff;
        }
        div:hover textarea::-moz-placeholder {
          color: #fff;
        }
        div:hover textarea:-ms-input-placeholder {
          color: #fff;
        }
        div:hover textarea:-moz-placeholder {
          color: #fff;
        }
        input {
          width: 100%;
          border: none;
          font-size: 1.1em;
          color: #fff;
          outline: none;
          background: none;
          appearance: none;
          border-radius: 2px;
          transition: all 0.2s;
          line-height: 20px;
          padding:10px;
          background:#111;
        }
        textarea {
          padding:10px;
          background:#111;
          width: 100%;
          border: none;
          font-size: 1.1em;
          color: #fff;
          outline: none;
          appearance: none;
          border-radius: 2px;
          resize: none;
          height: auto;
          overflow: auto;
          min-height: 125px;
          transition: all 0.2s;
          line-height: 20px;
        }
        .large {
          padding-left: 0;
          padding-right: 0;
          font-size: 1.2em;
          font-weight: 400;
        }
        .medium {
          padding-left: 0;
          padding-right: 0;
          font-size: 1em;
          font-weight: 400;
        }
        input::-webkit-input-placeholder {
          color:#aaa;
        }
        input::-moz-placeholder {
          color: #aaa;
        }
        input:-ms-input-placeholder {
          color: #aaa;
        }
        input:-moz-placeholder {
          color: #aaa;
        }
        textarea::-webkit-input-placeholder {
          color: #aaa;
        }
        textarea::-moz-placeholder {
          color: #aaa;
        }
        textarea:-ms-input-placeholder {
          color: #aaa;
        }
        textarea:-moz-placeholder {
          color: #aaa;
        }
        .large::-webkit-input-placeholder {
          color: #aaa;
        }
        .large::-moz-placeholder {
          color: #aaa;
        }
        .large:-ms-input-placeholder {
          color: #aaa;
        }
        .large:-moz-placeholder {
          color: #aaa;
        }
        input:focus::-webkit-input-placeholder {
          color: #fff;
        }
        input:focus::-moz-placeholder {
          color: #fff;
        }
        input:focus:-ms-input-placeholder {
          color: #fff;
        }
        input:focus:-moz-placeholder {
          color: #fff;
        }
        textarea:focus::-webkit-input-placeholder {
          color: #fff;
        }
        textarea:focus::-moz-placeholder {
          color: #fff;
        }
        textarea:focus:-ms-input-placeholder {
          color: #fff;
        }
        textarea:focus:-moz-placeholder {
          color: #fff;
        }
        label {
          display: block;
          color: #aaa;
          font-size: 1em;
          margin-bottom: 10px;
        }
        p {
          margin-top: 10px;
          font-size: 12px;
          font-family: Helvetica Neue;
          color: #aaa;
          font-style: italic;
          opacity: 0.75;
        }
      `}</style>
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.oneOf(['normal', 'large', 'medium']),
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false,
  hint: '',
  error: '',
  success: '',
  multiline: false,
  icon: null,
  value: '',
  size: 'normal',
  autoFocus: false,
  readOnly: false
}

export default Input