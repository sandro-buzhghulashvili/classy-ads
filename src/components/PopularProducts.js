import React, { useEffect, useState } from 'react';

import classes from './PopularProducts.module.scss';
import { Link } from 'react-router-dom';

const PopularProducts = () => {
  const [popularAds, setPopularAds] = useState([]);

  const fetchPopularAds = async () => {
    const res = await fetch(
      'https://classy-ads-8216b-default-rtdb.firebaseio.com/ads.json'
    );
    const data = await res.json();
    const popularAds = Object.values(data)[0].sort(
      (a, b) => b.reviews - a.reviews
    );
    setPopularAds(popularAds.slice(0, 5));
  };

  useEffect(() => {
    fetchPopularAds();
  }, []);
  return (
    <div className={classes['popular-products']}>
      <h1>Popular Products</h1>
      <h3>Lorem Ipsum Dolor Sit Amet</h3>
      <div className={classes.products}>
        {popularAds.map((ad) => {
          return (
            <div key={popularAds.indexOf(ad)} className={classes.ad}>
              <img src={ad.img} alt="ad" />
              <div className={classes.info}>
                <span>{ad.type}</span>
                <Link>{ad.title}</Link>
                <p>{ad.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularProducts;
