import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import classes from './Landing.module.scss';
import Stock from '../components/Stock';
import FeaturedBar from '../components/FeaturedBar';
import PopularProducts from '../components/PopularProducts';
import Testimonials from '../components/Testimonials';

const LandingPage = () => {
  const { scrollY } = useScroll();
  const bgImageOpacity = useTransform(scrollY, [0, 500, 900], [1, 0.5, 0.1]);
  const textY = useTransform(scrollY, [0, 400, 800], [0, -100, -200]);
  const textScale = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0.6]);

  return (
    <>
      <motion.main className={classes.hero} style={{ opacity: bgImageOpacity }}>
        <motion.h1
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ translateY: textY, scale: textScale }}
        >
          Largest Classifieds In The World
        </motion.h1>
        <motion.p
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ translateY: textY, scale: textScale }}
        >
          You can buy, sell anything you want.
        </motion.p>
      </motion.main>
      <Stock />
      <FeaturedBar />
      <PopularProducts />
      <Testimonials />
    </>
  );
};

export default LandingPage;
