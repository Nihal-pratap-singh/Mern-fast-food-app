import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" width={200}   />
    Admin Panel
      <img className='profile' src={assets.profile_image} alt="Profile"  width={50}/>
    </div>
  );
};

export default Navbar;
