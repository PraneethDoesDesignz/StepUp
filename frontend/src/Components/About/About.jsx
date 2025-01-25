// About.jsx
import React from 'react';
import './About.css'; // You can import your custom styles here
import aboutBanner from '../Assets/aboutbanner.png'; // Adjust path as needed
import videoSource from '../Assets/1.mp4'; // Adjust path as needed
import companyimg from '../Assets/a6.jpg'

const About = () => {
  return (
    <div>
      {/* Page Header Section */}
      <section id="page-header" className="about-header">
        <img className="banner" src={aboutBanner} alt="About Banner" />
        <h2>#KnowUs</h2>
        <p>Know More About Our Journey!</p>
      </section>

      {/* About Head Section */}
      <section id="about-head" className="section-p1">
        <img src={companyimg} alt="Who We Are" />
        <div>
          <h2>Who Are We?</h2><br></br>
          <p>
            Welcome to FitChk, where fashion meets function in perfect harmony. We are more than just a clothing brand; we're a lifestyle movement dedicated to empowering individuals to embrace their unique style while prioritizing comfort and versatility.
          </p><br></br>
          <p>
            At FitChk, we believe that looking good should never come at the expense of feeling good. That's why each piece in our collection is meticulously designed with both style and performance in mind. Whether you're hitting the gym, lounging at home, or exploring the city streets, our apparel is tailored to keep up with your active lifestyle.
          </p><br></br>
          <p>
            We aim to provide you with a wide variety of clothing apparel ranging from your casual wear to formal clothing. Our Developers; Sai Praneeth, S. Nashwitha and M. Charan aspire to tend to all your needs when browsing through this virtual closet. Our customer service is available 24x7 and is always ready to attend to your concerns. With exciting Offers and Sales that carry on throughout the year, we hope to be able to fulfil all your needs regarding your wardrobe.
          </p><br></br>
          <p>
            We celebrate diversity, inclusivity, and self-expression, because we know that true style knows no boundaries. Join us on this journey as we redefine what it means to be fashion-forward and fitness-ready where every outfit is a statement, and every moment is an opportunity to shine.
          </p>
        </div>
      </section>

      {/* Shopping Advertisement Section */}
      <section id="shopping-ad" className="section-p1">
        <h1>Check Out This Video!</h1>
        <div className="video">
          <video autoPlay muted loop src={videoSource} />
        </div>
      </section>

        <div className="text">
        {/* Social Media Tagging */}
            <h4 align="center"><b>Bought an outfit? Don't Forget to Tag Us on your Social Media!</b></h4>
      </div>
    </div>
  );
};

export default About;
