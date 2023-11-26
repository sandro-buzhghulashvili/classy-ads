import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import classes from './Stock.module.scss';
import { Home, Book, Bed, Lightbulb, Car, Pizza } from 'lucide-react';

const iconArray = [
  <Home />,
  <Book />,
  <Bed />,
  <Lightbulb />,
  <Car />,
  <Pizza />,
];

const Stock = () => {
  const { scrollY } = useScroll();
  const stocksY = useTransform(scrollY, [0, 600, 800], [-200, -350, -500]);
  const [ads, setAds] = useState([]);
  const stock = {};

  if (ads.length > 0) {
    ads.forEach((ad, index) => {
      if (!stock[ad.type]) {
        stock[ad.type] = {
          quantity: ad.productQuantity,
          icon: iconArray[index],
        };
      } else {
        stock[ad.type].quantity += ad.productQuantity;
      }
    });
  }

  const fetchAds = async () => {
    const res = await fetch(
      'https://classy-ads-8216b-default-rtdb.firebaseio.com/ads.json'
    );
    const data = await res.json();
    setAds(Object.values(data)[0]);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, translateY: -200 }}
      style={{ translateY: stocksY }}
      transition={{ duration: 1 }}
      className={classes.stocks}
    >
      {Object.entries(stock).map((element) => (
        <div className={classes.stock} key={element[0]}>
          <div className={classes.icon}>{element[1].icon}</div>
          <span>{element[0]}</span>
          <p>{element[1].quantity}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default Stock;
