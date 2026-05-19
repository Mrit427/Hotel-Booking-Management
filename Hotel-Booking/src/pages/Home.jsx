import React from 'react'
import Hero from"../Component/Hero"
import FeaturedDestination from '../Component/FeaturedDestination'
import HotelCard from "../Component/HotelCard";
import ExclusiveOffers from '../Component/ExclusiveOffers';
import Testimonial from '../Component/Testimonial';
import NewsLetter from '../Component/NewsLetter';

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturedDestination/>
        <HotelCard/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home