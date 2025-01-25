import React from 'react'
import './NewsLetter.css'
import footerbanner from '../Assets/footerimg.png'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <div className="footer-image">
              <img src={footerbanner} alt="" />
      </div>
      <h1>Get Exclusive Coupons And Offers!</h1>
      <p>Subscribe To Our Newsletter To Stay Updated.</p>
      <div className='input-content'>
        <input type="email" placeholder='Enter Your Email'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
