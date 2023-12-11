import { useState, useEffect } from 'react';

import classes from './Ads.module.scss';
import { Star } from 'lucide-react';

export default function Ads({ products }) {
  const [titleFilter, setTitleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);

  let filterTypes = [];

  products.forEach((ad) => {
    if (!filterTypes.includes(ad.type)) {
      filterTypes.push(ad.type);
    }
  });

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

  const paginationHandler = (newIndex) => {
    setIndex(newIndex);
  };

  const titleFilterHandler = (event) => {
    setTitleFilter(event.target.value);

    let filteredProducts = [];

    if (typeFilter) {
      if (typeFilter === 'default') {
        filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else {
        filteredProducts = products.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) &&
            product.type === typeFilter
        );
      }
    } else {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    }

    setAds(paginateArray(filteredProducts, 4));
  };

  const typeFilterHandler = (event) => {
    let filteredProducts = [];
    setTypeFilter(event.target.value);

    if (titleFilter.length === 0) {
      if (event.target.value === 'default') {
        filteredProducts = products;
      } else {
        filteredProducts = products.filter(
          (product) => product.type === event.target.value
        );
      }
    } else {
      if (event.target.value === 'default') {
        filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(titleFilter.toLowerCase())
        );
      } else {
        filteredProducts = products.filter(
          (product) =>
            product.type === event.target.value &&
            product.title.toLowerCase().includes(titleFilter.toLowerCase())
        );
      }
    }
    setAds(paginateArray(filteredProducts, 4));
  };

  useEffect(() => {
    if (ads.length === 0) setAds(paginateArray(products, 4));
  }, [products, ads]);

  // [].concat(...Object.values(ads)) -> Array form of ads object

  console.log(ads);

  return (
    <div className={classes.ads}>
      {Object.values(ads).length > 0 ? (
        <div className={classes.products}>
          {ads[index].map((product) => (
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
          ))}

          <ul className={classes.pagination}>
            {Object.values(ads).map((_, adIndex) => {
              return (
                <li
                  key={adIndex}
                  className={index === adIndex ? classes.active : undefined}
                  onClick={() => {
                    paginationHandler(adIndex);
                  }}
                >
                  {adIndex + 1}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h1 className={classes.disclaimer}>Found no ads</h1>
      )}
      <div className={classes.filter}>
        <h2>Filters</h2>
        <input
          type="text"
          placeholder="Title"
          value={titleFilter}
          onChange={titleFilterHandler}
        />
        <select onChange={typeFilterHandler}>
          <option value={'default'}>All Categories</option>
          {filterTypes.map((type) => {
            return <option key={type}>{type}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
