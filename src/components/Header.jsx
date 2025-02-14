import React, { useState, useEffect } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

const Header = () => {

  const [username, setUserName] = useState([]);
  const token = sessionStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      
      if (user) {
        const currentUser = user?.username?.split(' ')[0];        
        setUserName(currentUser);
      }
    }
  }, [token]);

  return (
    <>
      <div className='navbar d-flex align-items-center justify-content-between px-5'>
          <Link to={'/'} className='text-light nav-item fs-3 heading'><i className="fa-solid fa-graduation-cap"></i>EDWAY</Link>
          <div className='d-flex'>
              <Link className='nav-item nav-hover ms-4' to={'/'}>Home</Link>
              <Link className='nav-item nav-hover ms-4' to={'/courses'}>Courses</Link>
              <Link className='nav-item nav-hover ms-4' to={'/contact'}>Contact</Link>
              <Link className='nav-item nav-hover ms-4' to={'/about'}>About</Link>
              
              {
                token ? (
                  <Link className='nav-btn ms-4' to={`/${username}/user-profile`}><i className="fa-solid fa-user"></i> {username}</Link>
                )
                : (
                  <Link className='nav-btn ms-4' to={'/login'}>Login</Link>
                )
              }
          </div>
      </div>
    </>
  )
}

export default Header