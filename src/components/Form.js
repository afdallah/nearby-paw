import React from 'react';
import { useForm } from 'react-hook-form'

// Fields
export function Fields({ children }) {
  return <div className="fields">{children}</div>;
}

export function Field({ id, label, className }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        className={className ? className : 'input'}
        type="email"
        name="email"
        id={id}
        ref={register({
          required: 'Email is required!',
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Not a valid email format',
          },
        })}
      />
    </div>
  );
}
