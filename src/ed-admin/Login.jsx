import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import adminavtar from '../assets/adminpage.gif'
import { adminLoginAPI } from '../api/allAPI'

const Login = ({setIsLogin}) => {

  const navigate = useNavigate();
  const [ adminData, setAdminData ] = useState({
    email: '',
    password: ''
  })

  const adminLogin = async () => {
    if (adminData.email === '' || adminData.password === '') {
      return alert('Please fill all fields');
    }

    try {
      const result = await adminLoginAPI(adminData);
      if (result.status === 200) {
        alert('Login Successful');
        sessionStorage.setItem('adminToken', result.data.token);
        sessionStorage.setItem('adminData', JSON.stringify(result.data.admin));
        
        setIsLogin(true)
        setAdminData({
          email: '',
          password: '',
        });

        navigate('/ed-admin/dashboard');
      }else if(result.status === 404){
        alert(result.response.data)
      }else if(result.status === 401){
        alert(result.response.data)
      }else{
        alert('You are unauthorised')
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <div style={{height:'100vh', backgroundColor:'#fbfbfb'}} className="row">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="admin-card">
            <h4 className='text-center'>Edway Admin Login</h4>
            <input onChange={(e)=>setAdminData({...adminData, email:e.target.value})} className='ed-input' type="email" placeholder='Email address'/>
            <input onChange={(e)=>setAdminData({...adminData, password:e.target.value})} className='ed-input' type="password" placeholder='Password'/>
            <button onClick={adminLogin} className='ed-btn'>Login</button>
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-end">
          <img height={'600px'} src={adminavtar} alt="Admin Avatar" />
        </div>
      </div>
    </>
  )
}

export default Login