import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import pwdStrength from 'zxcvbn';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import notification from '../components/Notification';

import Button from '../components/Button';
import Separator from '../components/Separator';
import API from '../api';

const strength = {
  0: 'Worst',
  1: 'Bad',
  2: 'Weak',
  3: 'Good',
  4: 'Strong',
};

function Signup({ history }) {
  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [tos, setTos] = useState(false);
  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onTouched',
  });

  const { score, feedback } = pwdStrength(password);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onTosChange = (e) => setTos(!!e.target.value);

  const onSubmit = async (data) => {
    setIsSpinning(true);

    try {
      const res = await API.post('/user/register', data);

      notification.success({
        message: res.data.message,
      });

      history.push({
        pathname: '/signin',
        state: {
          email: data.email,
        },
      });
    } catch (err) {
      notification.error({
        message: err.response.data.message,
      });
    } finally {
      setIsSpinning(false);
    }
  };

  // Classnames
  const hintClass = classNames({
    'strength-hint': true,
    [`${strength[score].toLowerCase()}`]: strength[score],
  });

  return (
    <div className="page page--signup">
      <div className="flex">
        <section className="form-container">
          <div className="optin">
            <h2 className="h2">Signup</h2>
            <p>
              Give us some of your information to get free access to petmatcher
            </p>

            <Button variant="google">Sign up with Google</Button>

            <Separator text="Or" />

            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="fields">
                <div className="field">
                  <label htmlFor="">Email</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    ref={register({
                      required: 'Email is required!',
                      pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Not a valid email format',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="">Full name</label>
                  <input
                    className="input"
                    type="text"
                    name="fullName"
                    ref={register({
                      required: 'Fullname is required!',
                      minLength: {
                        value: 4,
                        message: 'Fullname is too short',
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="error">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="fields">
                <div className="field">
                  <label htmlFor="">Password</label>
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    onFocus={(e) => setPasswordFocus(!passwordFocus)}
                    onBlur={(e) => setPasswordFocus(!passwordFocus)}
                    ref={register({
                      required: 'Password is required!',
                      validate: (value) => score > 3 || 'You password is weak!',
                    })}
                  />

                  {password && passwordFocus && (
                    <div className={hintClass}>
                      Password strength: <strong>{strength[score]}</strong>
                      <ul className="strength-hint__suggestions">
                        {feedback.suggestions.map((suggestion, i) => {
                          return <li key={i}>{suggestion}</li>;
                        })}
                      </ul>
                      <ul className="strength-bar">
                        <li className="strength-bar__item"></li>
                        <li className="strength-bar__item"></li>
                        <li className="strength-bar__item"></li>
                        <li className="strength-bar__item"></li>
                        <li className="strength-bar__item"></li>
                      </ul>
                    </div>
                  )}

                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="">Password Confirmation</label>
                  <input
                    className="input"
                    type="password"
                    name="password_confirmation"
                    ref={register({
                      required: 'Password confirmation is required!',
                      validate: (value) =>
                        value === watch('password') || "Passwords don't match.",
                    })}
                  />

                  {errors.password_confirmation && (
                    <p className="error">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="label-checkbox" className="label-checkbox">
                  <input
                    checked={tos}
                    className="input input--checkbox"
                    type="checkbox"
                    name="tos"
                    onChange={onTosChange}
                    ref={register({
                      required:
                        'You have to agree with the terms and conditions',
                    })}
                  />
                  <span>
                    By creating an account you agree to the{' '}
                    <a href="#">terms of use</a> and our{' '}
                    <a href="#">privacy policy</a>
                  </span>
                </label>
                {errors.tos && <p className="error">{errors.tos.message}</p>}
              </div>

              <div className="field field--button">
                <Button
                  type="submit"
                  disabled={Object.keys(errors).length || !tos}
                  isSpinning={isSpinning}
                >
                  Create account
                </Button>
              </div>
            </form>

            <div className="text-center form-footer">
              <p>
                Already have an account? <Link to="/signin">Sign in</Link>
              </p>

              <a href="#">Forgot password?</a>
            </div>
          </div>
        </section>

        <section className="illustration-container">
          <img src="http://unsplash.it/1000" alt="" />
        </section>
      </div>
    </div>
  );
}

export default Signup;
