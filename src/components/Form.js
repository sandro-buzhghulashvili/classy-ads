import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classes from './Form.module.scss';
import useInput from '../hooks/use-input';

export default function Form() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailHandler,
    blurHandler: emailBlurHandler,
  } = useInput((value) => {
    if (value.trim().length > 0 && value.includes('@')) {
      return false;
    } else {
      return true;
    }
  });
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordHandler,
    blurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length === 0);
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value.trim().length === 0);

  const isLogin = searchParams.get('mode') === 'login';

  useEffect(() => {
    if (isLogin) {
      if (emailIsValid && passwordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    } else {
      if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid, isLogin]);

  return (
    <div className={classes.form}>
      <form>
        <div
          className={`${classes['form-control']} ${
            emailHasError ? classes.invalid : null
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <div
          className={`${classes['form-control']} ${
            passwordHasError ? classes.invalid : null
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={passwordHandler}
            onBlur={passwordBlurHandler}
          />
        </div>
        {!isLogin && (
          <div
            className={`${classes['form-control']} ${
              confirmPasswordHasError ? classes.invalid : null
            }`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onBlur={confirmPasswordBlurHandler}
              onChange={confirmPasswordHandler}
              value={confirmPasswordValue}
              type="password"
              id="confirmPassword"
            />
          </div>
        )}
        <div className={classes['form-control']}>
          {!isLogin ? (
            <h3>
              Have an account? <Link to="/form?mode=login">Login</Link>
            </h3>
          ) : (
            <h3>
              No account yet ? <Link to="/form?mode=signup">Register</Link>
            </h3>
          )}
        </div>
        <div className={classes['form-control']}>
          <button disabled={!formIsValid}>
            {!isLogin ? 'Register' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
