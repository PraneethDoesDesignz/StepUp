import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/Outliers_Logo.png'
import user_icon from '../Assets/user_icon.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=""></img>                     
      </div>
      <img className='nav-dropdown' onClick = {dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: 'none'}} to='/men'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}} to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contact")}}><Link style={{textDecoration: 'none'}} to='/contact'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration: 'none'}} to='/about'>About</Link>{menu==="about"?<hr/>:<></>}</li>
      </ul>
 
      <div className="nav-login-cart">
      <div className="login">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button><img src={user_icon} alt=''></img></button></Link>}
        </div>
        <Link to='/cart'><img src={cart_icon} alt=""></img></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
