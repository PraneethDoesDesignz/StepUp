import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Enter Your Name'/>
          <input type="email" placeholder='Enter Your Email'/>
          <input type="password" placeholder='Enter Your Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already Have An Account? <span>Login Here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the Terms of use and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup