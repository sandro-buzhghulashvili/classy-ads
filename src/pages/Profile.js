import React, { useContext, useEffect, useState } from 'react';
import userContext from '../store/user-context';

import LoadingScreen from '../components/UI/LoadingScreen';

import { json, useNavigate, useLoaderData } from 'react-router-dom';

import classes from './Profile.module.scss';
import { Star } from 'lucide-react';

const ProfilePage = () => {
  const [loading,setLoading] = useState(false)

  const data = useLoaderData()
  const availableAds = Object.values(data)

  const ctx = useContext(userContext);
  const navigate = useNavigate()

  const [myAds,setMyAds] = useState(ctx.user ? availableAds.filter(ad => ad.user === ctx.user.email) : [])

  console.log(myAds)

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

  const deleteAdHandler = async (ad) => {
    const adIndex = availableAds.findIndex(element => JSON.stringify(element) === JSON.stringify(ad))
    const databaseIndex = Object.keys(data)[adIndex]
    console.log(databaseIndex)
    try {
      const res = fetch(`https://classy-ads-8216b-default-rtdb.firebaseio.com/ads/-Nk5BEfJrNCg89tznfhP/${databaseIndex}.json`, {
        method : 'DELETE'
      })
      setMyAds(prevValue => prevValue.filter(obj => JSON.stringify(obj) !== JSON.stringify(ad)))
      ctx.applyFlashMessage({status : 'success', message : 'Ad successfully deleted'})
    } catch {
      ctx.applyFlashMessage({status : 'error', message : 'Could not delete ad'})
    }
  }

  const logoutHandler = () => {
    ctx.logout()
    ctx.applyFlashMessage({status : 'success', message : "Successfully logged out"})
    navigate('/')
  }

  useEffect(() => {
    if(!ctx.user) {
      ctx.applyFlashMessage({status : 'error', message : "User is not logged in"})
      navigate('/')
    }
  }, [ctx,navigate])

  if(!ctx.user) {
    return
  }

  return (
    <div className={classes.profile}>
      {loading && <LoadingScreen />}
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
      <h2>Your ads :</h2>
      <div className={classes.favorites}>
        {
          myAds.length > 0 ?
          myAds.map((ad) => {
            return (
              <div
                className={classes.card}
                key={myAds.indexOf(ad)}
              >
                <img src={ad.img} alt="ad" />
                <span className={classes.type}>{ad.type}</span>
                <h2>{ad.title}</h2>
                <p>{ad.location}</p>
                <div className={classes.rating}>
                  {displayStarRatings(Math.floor(ad.reviews))}
                  <p>( {ad.reviewQuantity} reviews )</p>
                </div>
                <button className={classes.delete} onClick={() => deleteAdHandler(ad)}>Delete</button>
              </div>
            );
          }) : 
          <h2 className={classes.disclaimer}>
          You haven't posted any ad
          </h2>
        }
      </div>
      <button onClick={logoutHandler} className={classes.logout}>Logout</button>
    </div>
  );
};

export const loader = async () => {
  try {
    const res = await fetch(
      'https://classy-ads-8216b-default-rtdb.firebaseio.com/ads/-Nk5BEfJrNCg89tznfhP.json'
    );

    if (!res.ok) {
      throw json({ message: 'Could not fetch user credentials' }, { status: 500 });
    }

    return res;
  } catch (e) {
    throw json({ message: 'Could not fetch user credentials' }, { status: 500 });
  }
}

export default ProfilePage;
