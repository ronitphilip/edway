import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserChart from './charts/UserChart';
import { deleteUserAPI, getAllUsersAPI, getAllViewsAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [edUsers, setEdUsers] = useState([]);
  const [edViews, setEdViews] = useState([])

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken')
    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    Promise.all([
      getAllUsersAPI(headers).then((res) => res.status === 200 && setEdUsers(res.data)),
      getAllViewsAPI(headers).then((res) => res.status === 200 && setEdViews(res.data)),
    ]).finally(() => setIsLoading(false));
  }, [edUsers]);

  const deleteUser = async (id) => {
    console.log(id);
    
    const token = sessionStorage.getItem('adminToken')
    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    try {
      const result = await deleteUserAPI(id, headers)
      if (result.status === 200) {
        setEdUsers(edUsers.filter(user => user.id !== id))
        alert('User deleted successfully')
      }else{
        alert('Error deleting user')
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <DashboardSkeleton />;

  return (
    <>
      <div className="row ed-minheight">
        <div className="col-lg-3">
          <Sidebar />
        </div>

        <div className="col-lg-9">
          <h1 className='mt-5'>Users</h1>
          <div className="row">
            <div className="col-lg-6 p-5">
              <table className='table table-dark table-striped'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {edUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={()=>deleteUser(user._id)} className='btn text-danger p-0 px-3'><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="col-lg-6">
              <div className="chart-div">
                <UserChart edUsers={edUsers} edViews={edViews} isDashboard={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;