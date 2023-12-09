import { useState } from 'react';

import classes from './Ads.module.scss';
import { Star } from 'lucide-react';

export default function Ads({ products }) {
  const paginateArray = (arr, itemPerPage) => {
    let adArray = arr.slice();
    const pages = Math.ceil(arr.length / itemPerPage);
    const transformedObject = {};

    for (let i = 0; i < pages; i++) {
      transformedObject[i] = adArray.slice(0, itemPerPage);
      adArray = adArray.slice(itemPerPage);
    }

    return transformedObject;
  };

  console.log(paginateArray(products, 3));

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

  return (
    <div className={classes.ads}>
      <div className={classes.products}>
        {products.map((product) => {
          {
            return (
              <div className={classes.product} key={products.indexOf(product)}>
                <img src={product.img} alt="ad" />
                <span className={classes.type}>{product.type}</span>
                <h2>{product.title}</h2>
                <p>{product.location}</p>
                <div className={classes.rating}>
                  {displayStarRatings(Math.round(product.reviews))}
                  <p>( {product.reviewQuantity} reviews )</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={classes.filter}>
        <h1>Filter</h1>
      </div>
    </div>
  );
}
