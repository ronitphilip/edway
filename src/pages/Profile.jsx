import React, { useEffect, useState } from 'react'
import { addTestimonyAPI, deleteTestimonyAPI, getActiveAlertsAPI, getSavedCollegesAPI, removeSavedCollegeAPI } from '../api/allAPI';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Profile = () => {

  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");
  const [isactive, setIsactive] = useState('noti')
  const [testiMessage, setTestiMessage] = useState('')
  const [notifications, setNotifications] = useState([])

  const [profile, setProfile] = useState(
    {
      name: '',
      email: '',
      savedColleges: [],
      testi: []
    })
  console.log(notifications);

  useEffect(() => {
    getUserData()
    getActiveAlerts()
  }, [])

  const getUserData = async () => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await getSavedCollegesAPI(headers);

        if (result.status === 200) {
          setProfile({
            name: result.data.username,
            email: result.data.email,
            savedColleges: result.data.saved,
            testi: result.data.testimonials
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  };

  const gotoView = (collegeId) => {
    navigate(`/${collegeId}/view`)
  }

  const removeSavedCollege = async (collegeId) => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await removeSavedCollegeAPI(collegeId, headers);
        if (result.status == 200) {
          getUserData()
          alert('College removed')
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const shareCollege = async (college) => {
    const collegeLink = `${window.location.origin}/${college._id}/view`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: college.collegename,
          text: `Check out ${college.collegename} on our website!`,
          url: collegeLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this device. Link copied!");
      await navigator.clipboard.writeText(collegeLink);
    }
  }

  const addTesti = async () => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      try {
        const reqBody = { message: testiMessage };

        const result = await addTestimonyAPI(reqBody, headers);

        if (result.status == 200) {
          getUserData()
          alert('Testimony added successfully');
        } else {
          console.log(result);
        }

        setTestiMessage('');
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please log in to add a testimony.");
    }
  };

  const removeTesi = async () => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      }

      try {
        const result = await deleteTestimonyAPI(headers)

        if (result.status == 200) {
          getUserData()
          alert('Testimony removed');
        } else {
          console.log(result);
        }

      } catch (err) {
        console.log(err);
      }
    }
  }

  const logout = () => {
    navigate('/')
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user')
  }

  const getActiveAlerts = async () => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      }

      try {
        const result = await getActiveAlertsAPI(headers)

        if (result.status == 200) {
          setNotifications(result.data)
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="row user-profile">
        <div className="col-lg-3 ps-2 p-0">
          <div style={{ height: '95%', overflow:scroll }} className="m-3 border rounded">
            <div className='d-flex justify-content-evenly py-4 border-bottom'>
              <button onClick={() => setIsactive('noti')} className={isactive == 'noti' ? 'btn btn-primary' : 'btn btn-secondary'}>Notifications</button>
              <button onClick={() => setIsactive('testi')} className={isactive == 'testi' ? 'btn btn-primary' : 'btn btn-secondary'}>Testiomoniy</button>
              <button onClick={() => setIsactive('more')} className={isactive == 'more' ? 'btn btn-primary' : 'btn btn-secondary'}>More</button>
            </div>
            {
              isactive == 'noti' ? (
                // notifications
                <div className='p-3'>
                  {
                    notifications?.length > 0 ? (
                      notifications.map((alert, index) => (
                        <div key={index} className='card mb-1'>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title">{alert?.title}</h5>
                              <p className="text-secondary m-0 p-0">{format(new Date(alert.createdAt), "dd/MM/yyyy")}</p>
                            </div>
                            <p>{alert?.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h6 className='text-center'>No notifications!</h6>
                    )
                  }

                </div>
              ) : isactive == 'testi' ? (
                // testiomoniy
                profile?.testi?.length > 0 ? (
                  profile?.testi?.map((testimonial) => (
                    <div key={testimonial._id} className='px-3 pt-4'>
                      <h4 className='pb-2'>Your testimony</h4>
                      <p className='mb-0'>{testimonial.message}</p>
                      <div className='d-flex justify-content-between align-items-center pt-2'>
                        <span>Approval: <span className={testimonial?.status == 'pending' ? 'text-primary' : 'text-success'}>{testimonial.status}</span></span>
                        <button onClick={removeTesi} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3">
                    <h6 className="text-center">Add Testimony</h6>
                    <textarea value={testiMessage} onChange={e => setTestiMessage(e.target.value)} className="form-control" rows="5" placeholder="Write your testimony"></textarea>
                    <div className='mt-2 d-flex justify-content-center'>
                      <button onClick={addTesti} className="btn btn-primary align-end">Post</button>
                    </div>
                  </div>
                )
              ) : (
                // more
                <div className='p-3'>
                  <h4 className='pb-2'>Discover</h4>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center justify-content-between'>All courses <Link to="/courses"><i class="fa-solid fa-arrow-right"></i></Link></div>
                    <div className='d-flex align-items-center justify-content-between'>Need more details?<Link to="/contact"><i class="fa-solid fa-arrow-right"></i></Link></div>
                    <div className='d-flex align-items-center justify-content-between'>Know us better!<Link to="/about"><i class="fa-solid fa-arrow-right"></i></Link></div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className="col-lg-9 ps-0">
          <div className="profile-banner h-25 d-flex justify-content-end align-items-start">
            <button onClick={logout} className='btn text-dark'><i class="fa-solid fa-user"></i> Logout</button>
          </div>
          <div className="profile-circle">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-name mb-5 d-flex flex-column">
            <div><span className='text-gradient'>{profile?.name}</span></div>
            <span style={{ marginTop: '-8px', fontSize: '14px' }}><i className="fa-regular fa-envelope"></i> {profile?.email}</span>
          </div>

          {/* saved colleges */}
          <div className="border mt-2 py-3 rounded">
            <table className="college-table">
              <thead>
                <tr>
                  <th className='ps-4'>No.</th>
                  <th>College</th>
                  <th>Location</th>
                  <th className='ps-4'>More</th>
                </tr>
              </thead>
              <tbody>
                {
                  profile?.savedColleges?.length > 0 ? (
                    profile?.savedColleges.map((college, index) => (
                      <tr key={college._id}>
                        <td className='ps-4'>{index + 1}.</td>
                        <td>
                          <button className='btn btn-link text-light ps-0' onClick={() => gotoView(college._id)}>{college?.collegename}</button>
                        </td>
                        <td>{college.location[0]?.state}, {college.location[0]?.district}</td>
                        <td className='pe-4'>
                          <button onClick={() => removeSavedCollege(college._id)} className="btn bg-transparent">
                            <i className="fa-solid fa-trash text-danger"></i>
                          </button>
                          <button onClick={() => shareCollege(college)} className="btn bg-transparent ms-2">
                            <i className="fa-solid fa-share text-primary"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='text-center'>No saved colleges!</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile