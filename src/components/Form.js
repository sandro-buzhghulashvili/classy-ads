import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import classes from './Form.module.scss';
import useInput from '../hooks/use-input';
import userContext from '../store/user-context';

export default function Form() {
  const userCtx = useContext(userContext);

  const navigate = useNavigate();
  const [error, setError] = useState(false);
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

  const registerNewUser = async () => {
    try {
      const users = await fetch(
        'https://classy-ads-8216b-default-rtdb.firebaseio.com/users.json'
      );
      const usersData = Object.values(await users.json());
      let extistingUser = usersData.find((user) => user.email === emailValue);

      if (!extistingUser) {
        const user = {
          email: emailValue,
          password: passwordValue,
        };
        const res = await fetch(
          'https://classy-ads-8216b-default-rtdb.firebaseio.com/users.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          }
        );

        if (!res.ok) {
          setError('Could not registered user');
        } else {
          userCtx.login(user);
          navigate('/');
        }
      } else {
        setError('User with following mail already exists');
      }
    } catch (e) {
      setError(e);
    }
  };

  const loginUser = async () => {
    try {
      const users = await fetch(
        'https://classy-ads-8216b-default-rtdb.firebaseio.com/users.json'
      );
      const usersData = Object.values(await users.json());

      const userData = {
        email: emailValue,
        password: passwordValue,
      };

      usersData.forEach((user) => {
        if (user.email === emailValue && user.password === passwordValue) {
          userCtx.login(userData);
          navigate('/');
        } else {
          setError('Username or password is invalid');
        }
      });
    } catch (e) {
      setError(e);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isLogin) {
      registerNewUser();
    } else {
      loginUser();
    }
  };

  useEffect(() => {
    if (isLogin) {
      if (emailIsValid && passwordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    } else {
      if (
        emailIsValid &&
        passwordIsValid &&
        confirmPasswordIsValid &&
        passwordValue === confirmPasswordValue
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
  }, [
    emailIsValid,
    passwordIsValid,
    confirmPasswordIsValid,
    isLogin,
    passwordValue,
    confirmPasswordValue,
  ]);

  return (
    <div className={classes.form}>
      <form onSubmit={submitHandler}>
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
        {error && (
          <div className={classes['form-control']}>
            <p className={classes['error-text']}>{error}</p>
          </div>
        )}
        <div className={classes['form-control']}>
          <button disabled={!formIsValid}>
            {!isLogin ? 'Register' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
