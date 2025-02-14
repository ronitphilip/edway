import React, { useState } from 'react'
import Header from '../components/Header'
import { loginAPI, registerAPI } from '../api/allAPI'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

  const navigate = useNavigate()
  const [ isLogin, setIsLogin ] = useState(false)
  const [ userDetails, setUserDetails ] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async () => {

    if (!userDetails.email || !userDetails.password || (isLogin && !userDetails.username)) {
      alert('Please fill all fields');
      return;
    }

    if(isLogin){
      // register
      try{
        const result = await registerAPI(userDetails)
        
        if(result.status==200){
          alert('Registration Successfull, Please login to continue');
          setIsLogin(false);
        }else if(result.status==406){
          alert(result.response.data);
        }

      }catch(err){
        console.log(err)
      }

    }else{
      // login
      try{
        const result = await loginAPI(userDetails)

        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          alert('Login Successfull');
          navigate('/')
        }else if(result.status==406){
          alert(result.response.data);
        }

      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <>
      <Header/>
      <div className="auth-container d-flex justify-content-center align-items-center">
        <div className='d-flex flex-column border p-5 rounded'>
          <p className='mb-0 text-secondary'>Start for free</p>
          <h1>{isLogin? 'Create new account' : 'Welcome back!'}</h1>
          <p className='text-secondary'> {isLogin? 'Already have an account?' : "Don't have an account?"} <button onClick={()=>setIsLogin(!isLogin)} className="btn btn-link ps-0">{isLogin? 'Log in' : 'Sign up'}</button></p>
          {
            isLogin && <input onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})} className='mb-4 login-box' placeholder='Name' type="text" />
          }
          <input onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})} className='mb-4 login-box' placeholder='Email' type="email" />
          <input onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})} className='mb-4 login-box' placeholder='Password' type="password" />
          <div className="w-full d-flex justify-content-center">
            <button onClick={handleSubmit} className="btn btn-primary rounded-pill">{isLogin? 'Create account' : 'Log in'}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth