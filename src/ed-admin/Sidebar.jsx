import React from 'react'
import { FaList, FaUser, FaUserGraduate, FaStar, FaComment, FaBell, FaCog, FaPhoneAlt } from 'react-icons/fa';
import { NavLink  } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <h4 className='pt-5 sidebar-title'>Edway Admin</h4>
        <ul className="sidebar-menu">
        <li>
          <NavLink to="/ed-admin/dashboard">
            <FaList className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/users">
            <FaUser className="icon" /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/colleges">
            <FaUserGraduate className="icon" /> Colleges
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/reviews">
            <FaStar className="icon" /> Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/testimonials">
            <FaComment className="icon" /> Testimonials
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/alerts">
            <FaBell className="icon" /> Alerts
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/contacts">
            <FaPhoneAlt  className="icon" /> Enquires
          </NavLink>
        </li>
        <li>
          <NavLink to="/ed-admin/settings">
            <FaCog className="icon" /> Settings
          </NavLink>
        </li>
      </ul>
      </div>
    </>
  )
}

export default Sidebar