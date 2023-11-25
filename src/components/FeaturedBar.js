import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import furnitureImg from '../assets/furniture.jpg';
import consoleImg from '../assets/console.jpg';
import handicraftImg from '../assets/handicraft.jpg';
import sedanImg from '../assets/sedan.jpg';
import smartHomeImg from '../assets/smart-home.jpg';

import classes from './FeatureBar.module.scss';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

const Images = [
  consoleImg,
  smartHomeImg,
  sedanImg,
  handicraftImg,
  furnitureImg,
];

const FeaturedBar = () => {
  const [featuredAds, setFeaturedAds] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  const { scrollY } = useScroll();
  const sliderY = useTransform(scrollY, [0, 800, 1000], [0, -200, -250]);

  const slideRight = () => {
    let itemOnPage = 3;
    if (window.innerWidth <= 1145) {
      itemOnPage = 2;
    }
    setSliderIndex((prevValue) => {
      if (prevValue >= Math.ceil(Images.length / itemOnPage)) {
        return 0;
      } else {
        return prevValue + 1;
      }
    });
  };

  const slideLeft = () => {
    let itemOnPage = 3;
    if (window.innerWidth <= 1145) {
      itemOnPage = 2;
    }
    setSliderIndex((prevValue) => {
      if (prevValue <= 0) {
        return Math.ceil(Images.length / itemOnPage);
      } else {
        return prevValue - 1;
      }
    });
  };

  const fetchAds = async () => {
    const res = await fetch(
      'https://classy-ads-8216b-default-rtdb.firebaseio.com/ads.json'
    );
    const data = await res.json();
    const ads = data[Object.keys(data)[0]];
    let featuredAds = [];

    for (let i of ads) {
      if (featuredAds.length < 5) {
        featuredAds.push(i);
      } else {
        for (let j of featuredAds) {
          if (i.reviewQuantity > j.reviewQuantity) {
            featuredAds[featuredAds.indexOf(j)] = i;
            break;
          }
        }
      }
    }

    setFeaturedAds(
      featuredAds.sort((a, b) => b.reviewQuantity - a.reviewQuantity)
    );
  };

  const displayStarRatings = (rating) => {
    const fullStars = Array.from({ length: rating }, (_, index) => (
      <Star key={index} fill="yellow" stroke="none" />
    ));

    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
      <Star key={index} stroke="none" fill="#ccc" />
    ));

    return (
      <div>
        {fullStars}
        {emptyStars}
      </div>
    );
  };

  useEffect(() => {
    fetchAds();
  }, []);
  return (
    <motion.div style={{ y: sliderY }} className={classes.featured}>
      <p>Featured Ads</p>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        className={classes.carousel}
      >
        {featuredAds.map((ad, index) => {
          return (
            <motion.div
              style={{ x: `${-(sliderIndex * 100)}%` }}
              key={featuredAds.indexOf(ad)}
              className={classes.card}
            >
              <img src={Images[index]} alt="ad" />
              <div className={classes.type}>
                <span>{ad.type}</span>
                <span className={classes.icon}>
                  <Heart />
                </span>
              </div>
              <h2>{ad.title}</h2>
              <p>{ad.location}</p>
              <div className={classes.rating}>
                {displayStarRatings(Math.floor(ad.reviews))}
                <p>( {ad.reviewQuantity} reviews )</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={classes['slider-btns']}>
        <span onClick={slideLeft}>
          <ChevronLeft />
        </span>
        <span onClick={slideRight}>
          <ChevronRight />
        </span>
      </div>
    </motion.div>
  );
};

export default FeaturedBar;
