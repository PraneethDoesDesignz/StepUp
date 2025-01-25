import React from 'react';
import './Hero.css';
import herobanner from '../Assets/exclusive_image.png'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src={herobanner} alt="" />
      </div>
      <div className="hero-content">
        <div className="line">
          <>.</>
        </div>
        <h1>Explore <br /> </h1>
        <h2>Exclusive <br /> Outfits</h2>
        <button className="shop-now">Shop Now</button>
      </div>
    </section>
  );
}

export default HeroSection;