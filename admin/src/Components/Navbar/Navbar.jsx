import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" />   
        <img src={navProfile} className="nav-profile" alt="" />   
    </div>
    </div>
  )
}

export default Navbar
