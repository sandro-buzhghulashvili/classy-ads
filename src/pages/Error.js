import React from 'react';
import { useRouteError } from 'react-router';

import classes from './Error.module.scss';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ErrorPage = () => {
  const error = useRouteError();
  let message = '';

  if (error.status === 404) {
    message = 'Resource was not found';
  }

  if (error.status === 500) {
    message = error.data.message;
  }

  console.log(error);
  return (
    <>
      <Navbar />
      <div className={classes.error}>
        <h1>{message}</h1>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
