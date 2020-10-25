import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import API from '../api';
import Button from '../components/Button';
import Separator from '../components/Separator';
import notification from '../components/Notification';

const strength = {
  0: 'Worst',
  1: 'Bad',
  2: 'Weak',
  3: 'Good',
  4: 'Strong',
};

function Signin({ location, history }) {
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setIsSpinning(true);
    try {
      const res = await API.post('/user/login', data);

      localStorage.setItem('access_token', res.data.token);

      notification.success({
        message: res.data.message,
      });

      history.push({
        pathname: '/',
      });
    } catch (err) {
      notification.error({
        message: err.response.data.message,
      });
    } finally {
      // setIsSpinning(false);
    }
  };

  return (
    <div className="page page--signin">
      <div className="flex">
        <section className="form-container">
          <div className="optin">
            <h2 className="h2">Signin</h2>
            <p>Ready to find your 4 legs's sweetheart?</p>

            <Button variant="google">Sign in with Google</Button>

            <Separator text="Or" />

            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label htmlFor="">Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  defaultValue={location.state && location.state.email}
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
                <label htmlFor="">Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onFocus={(e) => setPasswordFocus(!passwordFocus)}
                  onBlur={(e) => setPasswordFocus(!passwordFocus)}
                  ref={register({ required: 'Password is required!' })}
                />

                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div className="field field--button">
                <Button
                  type="submit"
                  isSpinning={isSpinning}
                  disabled={Object.keys(errors).length}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="text-center form-footer">
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
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

export default Signin;
