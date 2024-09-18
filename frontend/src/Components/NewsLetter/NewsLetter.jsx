import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Coupons And Offers!</h1>
      <p>Subscribe To Our Newsletter To Stay Updated.</p>
      <div>
        <input type="email" placeholder='Enter Your Email'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
