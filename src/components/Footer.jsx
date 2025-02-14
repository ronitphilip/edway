import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='pt-5 row footer'>
        <div className='col-lg-3 d-flex align-items-center justify-content-center border-end'>
            <h1 className="heading"><i className="fa-solid fa-graduation-cap"></i>EDWAY</h1>
        </div>
        <div className='col-lg-2 d-flex flex-column'>
            <Link className='nav-item nav-hover ms-4' to={'/'}>Home</Link>
            <Link className='nav-item nav-hover ms-4' to={'/courses'}>Courses</Link>
            <Link className='nav-item nav-hover ms-4' to={'/contact'}>Contact</Link>
            <Link className='nav-item nav-hover ms-4' to={'/about'}>About</Link>
        </div>
        <div className="col-lg-3 d-flex flex-column justify-content-center">
            <h6 className='nav-item'>Contact us : <span className='nav-hover contact-det'>+91 0000000000</span></h6>
            <h6 className='nav-item'>Email :<span className='nav-hover'> edway@gmail.com</span></h6>
        </div>
        <div className="col-lg-4 d-flex flex-column justify-content-between">
            <div className="mb-3">
                <a href="fcebook.com"><i className="fa-brands fa-facebook fs-4 nav-item nav-hover"></i></a>
                <a href="instagram.com"><i className="fa-brands fa-instagram fs-4 nav-item nav-hover"></i></a>
                <a href="youtube.com"><i className="fa-brands fa-youtube fs-4 nav-item nav-hover"></i></a>
                <a href="gmail.com"><i className="fa-solid fa-envelope fs-4 nav-item nav-hover"></i></a>
                <a href="whatsapp.com"><i className="fa-brands fa-whatsapp fs-4 nav-item nav-hover"></i></a>
            </div>
            <div className='ms-3'>
                <label>
                    Join our newsletter for latest updates!
                </label> <br />
                <input className='mt-2' id='newsletterbox' type="text" placeholder='Enter your email'/>
                <button className='btn btn-primary ms-2'>Subscribe</button>
            </div>
        </div>
        <hr className='mt-5'/>
        <div className='text-center text-secondary pb-2'>2025 &copy; Edway | All right reserved</div>
    </div>
  )
}

export default Footer