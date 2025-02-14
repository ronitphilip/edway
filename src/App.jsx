import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import About from './pages/About';
import Auth from './pages/Auth';
import View from './pages/View';
import Profile from './pages/Profile';
import Login from './ed-admin/Login';
import Dashboard from './ed-admin/Dashboard';
import Users from './ed-admin/Users';
import Colleges from './ed-admin/Colleges';
import Reviews from './ed-admin/Reviews';
import Testimonials from './ed-admin/Testimonials';
import Alerts from './ed-admin/Alerts';
import Pnf from './pages/Pnf'
import Settings from './ed-admin/Settings';
import Contacts from './ed-admin/Contacts';

const App = () => {
  const [ isLogin, setIsLogin ] = useState(false)
  
  useEffect(()=>{
    const token = sessionStorage.getItem('adminToken');
    const admin = JSON.parse(sessionStorage.getItem("adminData"));
    if(token && admin){
      setIsLogin(true)
    }
  }, [isLogin])

  const token = sessionStorage.getItem('adminToken');
  const admin = JSON.parse(sessionStorage.getItem("adminData"));
  
  return (
    <div className='theme-light'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/:id/view" element={<View />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/:username/user-profile" element={<Profile />} />
        <Route path="/ed-admin" element={<Login setIsLogin={setIsLogin}/>} />

        {token && admin.role === 'admin' && (
          <>
            <Route path="/ed-admin/dashboard" element={<Dashboard />} />
            <Route path="/ed-admin/users" element={<Users />} />
            <Route path="/ed-admin/colleges" element={<Colleges />} />
            <Route path="/ed-admin/reviews" element={<Reviews />} />
            <Route path="/ed-admin/testimonials" element={<Testimonials />} />
            <Route path="/ed-admin/alerts" element={<Alerts />} />
            <Route path="/ed-admin/settings" element={<Settings />} />
            <Route path="/ed-admin/contacts" element={<Contacts />} />
          </>
        )}

        <Route path="*" element={<Pnf />} />
      </Routes>
    </div>
  );
};

export default App;