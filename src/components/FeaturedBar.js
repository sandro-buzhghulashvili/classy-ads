import React, {useEffect, useState} from "react";
import furnitureImg from "../assets/furniture.jpg"
import consoleImg from "../assets/console.jpg"
import handicraftImg from "../assets/handicraft.jpg"
import sedanImg from "../assets/sedan.jpg"
import smartHomeImg from "../assets/smart-home.jpg"


import classes from "./FeatureBar.module.scss"
import { Heart, Star } from "lucide-react";

const FeaturedBar = () => {
    const Images = [consoleImg, smartHomeImg, sedanImg, handicraftImg, furnitureImg]
    const [featuredAds,setFeaturedAds] = useState([])

    const fetchAds = async () => {
        const res = await fetch("https://classy-ads-8216b-default-rtdb.firebaseio.com/ads.json")
        const data = await res.json()
        const ads = data[Object.keys(data)[0]]
        let featuredAds = []

        for(let i of ads) {
            if(featuredAds.length < 5) {
                featuredAds.push(i)
            } else {
                for(let j of featuredAds) {
                    if(i.reviewQuantity > j.reviewQuantity) {
                        featuredAds[featuredAds.indexOf(j)] = i
                        break
                    }
                }
            }
        }

        setFeaturedAds(featuredAds.sort((a,b) => b.reviewQuantity - a.reviewQuantity))
    }

    console.log(featuredAds)

    const displayStarRatings = (rating) => {
        const fullStars = Array.from({ length: rating }, (_, index) => (
            <Star key={index} />
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
    }

    useEffect(() => {
        fetchAds()
    }, [])
    return (
        <div className={classes.featured}>
            <p>Featured Ads</p>
            <div className={classes.carousel}>
                {
                    featuredAds.map((ad,index) => {
                        return (
                            <div key={featuredAds.indexOf(ad)} className={classes.card}>
                                <img src={Images[index]} />
                                <div className={classes.type}>
                                    <span>{ad.type}</span>
                                    <span className={classes.icon}><Heart /></span>
                                </div>
                                <h2>{ad.title}</h2>
                                <p>{ad.location}</p>
                                <div className={classes.rating}>
                                    {displayStarRatings(Math.floor(ad.reviews))}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedBar