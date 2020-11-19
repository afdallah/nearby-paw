import React from 'react';
import classNames from 'classnames'
import { ImSpinner2 } from 'react-icons/im'
import Icon from './SvgIcons'

function Button({ icon, variant, children, type, isSpinning, className, ...rest }) {
  const btnClass = classNames({
    button: true,
    [`button--${variant}`]: variant,
    [`${className}`]: className
  })

  return (
    <button className={btnClass} type={type} {...rest}>
      {!icon ? <Icon type={variant} /> : {icon}}

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
