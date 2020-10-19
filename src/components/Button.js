import React from 'react';
import classNames from 'classnames'
import { ImSpinner2 } from 'react-icons/im'
import Icon from './SvgIcons.js'

function Button({ variant, children, type, isSpinning, ...rest }) {

  const btnClass = classNames({
    button: true,
    [`button--${variant}`]: variant
  })

  return (
    <button className={btnClass} type={type} {...rest}>
      <Icon type={variant} />

      {isSpinning && (
        <div className="button__spinner">
          <ImSpinner2 />
        </div>
      )}

      {children || 'Button text'}
    </button>
  );
}

export default Button;
