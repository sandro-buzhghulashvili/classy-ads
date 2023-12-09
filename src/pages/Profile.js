import React, { useContext } from 'react';
import userContext from '../store/user-context';

import classes from './Profile.module.scss';
import { Star } from 'lucide-react';

const ProfilePage = () => {
  const ctx = useContext(userContext);

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
    <div className={classes.profile}>
      <h2>User : {ctx.user.email}</h2>
      <h2>Favorite ADS:</h2>
      <div className={classes.favorites}>
        {ctx.user.favorites && ctx.user.favorites.length > 0 ? (
          ctx.user.favorites.map((ad) => {
            return (
              <div
                className={classes.card}
                key={ctx.user.favorites.indexOf(ad)}
              >
                <img src={ad.img} alt="ad" />
                <span className={classes.type}>{ad.type}</span>
                <h2>{ad.title}</h2>
                <p>{ad.location}</p>
                <div className={classes.rating}>
                  {displayStarRatings(Math.floor(ad.reviews))}
                  <p>( {ad.reviewQuantity} reviews )</p>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className={classes.disclaimer}>
            You don't have any favorite ads
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
