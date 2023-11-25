import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

import { testimonials } from '../assets/TESTIMONIALS';
import classes from './Testimonials.module.scss';
import { Circle } from 'lucide-react';


const Testimonials = () => {
  const [sliderIndex,setSliderIndex] = useState(0)

  const sliderIndexHandler = (index) => {
    setSliderIndex(index)
  }

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setSliderIndex(prevValue => {
        if(prevValue === 0) return prevValue += 1
        if(prevValue === 1) return prevValue += 1
        if(prevValue === 2) return 0
      })
    }, 5000)

    return () => {
      clearInterval(sliderInterval)
    }
  }, [])

  return (
    <div className={classes.testimonials}>
      <h1 className={classes.header}>Testimonials</h1>
      <div
        className={classes.profiles}
        style={{ width: `${testimonials.length * 100}%` }}
      >
        {testimonials.map((person) => {
          console.log(person)
          return (
            <motion.div animate={{ x: `-${sliderIndex * 100}%` }} transition={{duration : 1, type : "spring"}} style={{x : `-${sliderIndex * 100}%`}} className={classes.profile} key={person.id}>
              <img src={person.img} alt="person" />
              <p>{person.user}</p>
              <h1>{person.body}</h1>
            </motion.div>
          );
        })}
      </div>
      <div className={classes.control}>
        {
          Array.from({length : testimonials.length}).map((_, index) => {
            return (
              <span key={index} onClick={() => sliderIndexHandler(index)} className={`${classes.icon} ${sliderIndex === index ? classes.active : undefined}`}><Circle /></span>
            )
          })
        }
      </div>
    </div>
  );
};

export default Testimonials;
