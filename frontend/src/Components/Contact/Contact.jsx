import React from 'react';
import './Contact.css'; // Importing the CSS styles
import contactbanner from '../Assets/contactbanner.jpg'

const Contact = () => {
  return (
    <div>
      {/* Page Header */}
      <section id="page-header" className="about-header">
        <img className='banner' src={contactbanner} alt="" />
        <h2>#Let's_Talk</h2>
        <p>Need some help? Contact Us!</p>
      </section>

      {/* Contact Details */}
      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>Get In Touch</span>
          <h2>Visit Our Location or Contact Us Today!</h2>
          <h3>Head Office</h3>
          <div>
            <ul>
              <li>
                <i className="fa-solid fa-map-location-dot"></i>
                <p>GCET Cheeryal(V), Keesara (M), Medchal dist., Telangana-501 301</p>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>info@gcet.edu</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>+91 0123456789</p>
              </li>
              <li>
                <i className="fa-solid fa-clock"></i>
                <p>Monday To Saturday: 9:00am to 3:30pm</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="map">
          <iframe
            title='map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.726691940926!2d78.62845237468585!3d17.52055539895604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9d3704b16971%3A0x522242e0977760ef!2sGeethanjali%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sus!4v1715333531390!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Form Details */}
      <section id="form-details">
        <form action="https://api.web3forms.com/submit" method="POST">
          <span>Leave A Message</span>
          <h2>We'd Love To Hear From You</h2>
          <input
            type="hidden"
            name="access_key"
            value="9e12c783-8948-4b22-a19d-272ed06d9ccd"
            required
          />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="text" name="email" placeholder="Your Email" required />
          <textarea name="message" cols="30" rows="10" placeholder="Enter Message"></textarea>
          <button type="submit" className="normal">
            Submit
          </button>
        </form>

        {/* Contact People */}
        <div className="people">
          <div>
            <img src="Images/People/1.png" alt="T.A Sai Praneeth" />
            <p>
              <span>T.A Sai Praneeth</span>
                    Web Developer
              <br /> Phone Number: +91 8886588871
              <br /> Email: praneeth.tasp@gmail.com
            </p>
          </div>
          <div>
            <img src="Images/People/nashwitha.png" alt="S. Nashwitha" />
            <p>
              <span>Shaik Sulaiman</span>
              Owner, Founder
              <br /> Phone Number: +91 7032393787
              <br /> Email: contact@example.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
