import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { changeAdminPasswordAPI, createAdminAPI } from '../api/allAPI';

const Settings = () => {
  const adminData = JSON.parse(sessionStorage.getItem('adminData'));
  const token = sessionStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  const [show, setShow] = useState('');
  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleNewAdminChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    try {
      const res = await changeAdminPasswordAPI(passwordData, headers);
      if (res.status === 200) {
        alert("Password updated successfully");
        setPasswordData({ email: "", oldPassword: "", newPassword: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const res = await createAdminAPI(newAdmin, headers);
      if (res.status === 201) {
        alert("New admin created successfully");
        setNewAdmin({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem('adminToken')
    sessionStorage.removeItem('adminData')
    window.location.href = '/'
  }

  return (
    <>
      <div className="row ed-minheight">
        <div className="col-lg-3">
          <Sidebar />
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mt-3">Settings</h2>
            <button onClick={logOut} className="btn btn-outline-light h-50">Logout<i className="fa-solid fa-right-from-bracket ms-2"></i></button>
          </div>
          <div className='mt-3'>
            <h5>Name: {adminData.name}</h5>
            <h5>Email: {adminData.email}</h5>
            <div>
              <button onClick={() => setShow('edit')} className='btn btn btn-outline-primary me-2 my-3'>Change password</button>
              <button onClick={() => setShow('create')} className='btn btn-outline-success'>Creaet new admin</button>
            </div>
          </div>

          <div>
            {
              show === 'edit' && (
                <div className="card mt-4 p-3 w-50">
                  <div className='d-flex justify-content-between'>
                    <h4>Change Password</h4>
                    <button onClick={() => setShow('')} className='btn pt-0 pe-0'><i class="fa-regular fa-circle-xmark"></i></button>
                  </div>
                  <input className="form-control my-2" type="email" name="email" value={passwordData.email} onChange={handlePasswordChange} placeholder="Admin Email" />
                  <input className="form-control my-2" type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} placeholder="Old Password" />
                  <input className="form-control my-2" type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="New Password" />
                  <button className="btn btn-primary" onClick={handleChangePassword}> Update Password </button>
                </div>
              )
            }
            {
              show === 'create' && (
                <div className="card mt-4 p-3 w-50">
                  <div className='d-flex justify-content-between'>
                    <h4>Create New Admin</h4>
                    <button onClick={() => setShow('')} className='btn pt-0 pe-0'><i class="fa-regular fa-circle-xmark"></i></button>
                  </div>
                  <input className="form-control my-2" type="text" name="username" value={newAdmin.username} onChange={handleNewAdminChange} placeholder="Admin Username" />
                  <input className="form-control my-2" type="email" name="email" value={newAdmin.email} onChange={handleNewAdminChange} placeholder="Admin Email" />
                  <input className="form-control my-2" type="password" name="password" value={newAdmin.password} onChange={handleNewAdminChange} placeholder="Admin Password" />
                  <button className="btn btn-success" onClick={handleCreateAdmin}> Create Admin </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
