import React from 'react';

import { testimonials } from '../assets/TESTIMONIALS';
import classes from './Testimonials.module.scss';

const Testimonials = () => {
  return (
    <div className={classes.testimonials}>
      <h1 className={classes.header}>Testimonials</h1>
      <div
        className={classes.profiles}
        style={{ width: `${testimonials.length * 100}%` }}
      >
        {testimonials.map((person) => {
          return (
            <div className={classes.profile} key={person.id}>
              <img src={person.img} alt="person" />
              <p>{person.user}</p>
              <h1>{person.body}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
