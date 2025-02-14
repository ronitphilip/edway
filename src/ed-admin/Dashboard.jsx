import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import UserChart from './charts/UserChart'
import { getAllAlertsAPI, getAllCommentsAPI, getAllCoursesAPI, getAllEnquiresAPI, getAllTestimonialsAPI, getAllUsersAPI, getAllViewsAPI } from '../api/allAPI'
import CollegesChart from './charts/CollegesChart'
import { useDispatch } from 'react-redux'
import { fetchCollege } from '../redux/slices/collegeSlice'
import DashboardSkeleton from './DashboardSkeleton '
import CommentsChart from './charts/CommentsChart'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const admin = JSON.parse(sessionStorage.getItem('adminData')) || []
  const token = sessionStorage.getItem('adminToken')
  const headers = {
    'Authorization': `Bearer ${token}`,
  }

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState('none')
  const [edUsers, setEdUsers] = useState([])
  const [edViews, setEdViews] = useState([])
  const [edCourses, setEdCourses] = useState([])
  const [edComments, setEdComments] = useState([])
  const [pendingTesti, setPendingTesti] = useState(0)
  const [successTesti, setSuccessTesti] = useState(0)
  const [pendingEnquires, setPendingEnquires] = useState(0)
  const [successEnquires, setSuccessEnquires] = useState(0)
  const [rejectedEnquires, setRejectedEnquires] = useState(0)
  const [activeAlerts, setActiveAlerts] = useState(0)
  const [pendinAlerts, setPendingAlerts] = useState(0)
  const [completedAlerts, setCompletedAlerts] = useState(0)

  const handleToggle = (item) => {
    if (item == 'noti') {
      setShow(!show)
      setDisplay(item)
    } else {
      setShow(!show)
      setDisplay(item)
    }
  }

  const logOut = () => {
    sessionStorage.removeItem('adminToken')
    sessionStorage.removeItem('adminData')
    window.location.href = '/'
  }

  useEffect(() => {
    Promise.all([
      getAllCommentsAPI(headers).then((res) => res.status === 200 && setEdComments(res.data)),
      getAllUsersAPI(headers).then((res) => res.status === 200 && setEdUsers(res.data)),
      getAllViewsAPI(headers).then((res) => res.status === 200 && setEdViews(res.data)),
      getAllCoursesAPI().then((res) => res.status === 200 && setEdCourses(res.data)),
      getAllTestimonialsAPI(headers).then((res) => res.status === 200 && handleTesti(res.data)),
      getAllEnquiresAPI(headers).then((res) => res.status === 200 && handleEnquires(res.data)),
      getAllAlertsAPI(headers).then((res) => res.status === 200 && handleAlerts(res.data)),
      dispatch(fetchCollege()),
    ]).finally(() => setIsLoading(false));
  }, []);

  const handleTesti = (testi) => {
    const counts = testi.reduce(
      (acc, item) => {
        if (item.status === 'pending') {
          acc.pending += 1;
        } else {
          acc.success += 1;
        }
        return acc;
      },
      { pending: 0, success: 0 }
    );

    setPendingTesti(counts.pending);
    setSuccessTesti(counts.success);
  };

  const handleEnquires = (enquiries) => {
    const counts = enquiries.reduce(
      (acc, item) => {
        if (item.status === 'contacted') {
          acc.contacted += 1;
        } else if (item.status === 'pending') {
          acc.pending += 1;
        } else {
          acc.rejected += 1;
        }
        return acc;
      },
      { contacted: 0, pending: 0, rejected: 0 }
    );

    setSuccessEnquires(counts.contacted);
    setPendingEnquires(counts.pending);
    setRejectedEnquires(counts.rejected);
  }

  const handleAlerts = (alerts) => {
    const counts = alerts.reduce(
      (acc, item) => {
        if (item.status === 'active') {
          acc.active += 1;
        } else if (item.status === 'pending') {
          acc.pending += 1;
        } else {
          acc.completed += 1;
        }
        return acc;
      },
      { active: 0, pending: 0, completed: 0 }
    );

    setActiveAlerts(counts.active);
    setPendingAlerts(counts.pending);
    setCompletedAlerts(counts.completed);
  }

  if (isLoading) return <DashboardSkeleton />;

  return (
    <>
      <div className="row ed-minheight">

        <div className="col-lg-3">
          <Sidebar />
        </div>

        <div className="col-lg-9 px-3">
          {/* nav bar */}
          <nav className='d-flex align-items-center justify-content-between pt-3'>
            <span className="text-gradient">Welcome back {admin.name}!</span>
            <div className='d-flex align-items-center me-3'>
              <button onClick={() => handleToggle('noti')} className='btn pe-3 admin-toggle-btn'><i className="fa-regular fa-bell text-light"></i></button>
              <button onClick={() => handleToggle('settings')} className='btn ps-1 text-light admin-toggle-btn'><i className="fa-solid fa-user-tie pe-2 ps-2"></i>{admin.name}</button>
            </div>
          </nav>

          <div className={`display-content ${show ? 'show' : 'display-none'}`}>
            {
              display == 'settings' ? (
                <>
                  <button onClick={logOut} className='btn'><i className="fa-solid fa-right-to-bracket"></i> Logout</button>
                  <Link to={'/ed-admin/settings'} className='btn'><i className="fa-solid fa-gear"></i> Settings</Link>
                </>
              ) : (
                <>
                  <span>No notifications</span>
                </>
              )
            }
          </div>

          <h1>Dashboard</h1>
          {/* body */}
          <div className='mt-4 dashboard-body row'>
            <div style={{ height: '790px' }} className="col-lg-6 p-0 pe-2">
              <div style={{ height: '350px' }} className="widget">
                <CollegesChart edCourses={edCourses} />
              </div>
              <div style={{ height: '395px' }} className="widget mt-4">
                <CommentsChart edComments={edComments} />
              </div>
            </div>
            <div className="col-lg-6 p-0 ps-2">
              <div style={{ height: '350px' }} className="widget">
                <UserChart edUsers={edUsers} edViews={edViews} isDashboard={true}/>
              </div>
              <div style={{ height: '185px' }} className="mt-4">
                <div style={{ height: '185px' }} className="row m-0 gap-3">
                  <div style={{ width: '268px' }} className="col-lg-6 widget">
                    <p className='mt-3 ms-3'>Testimonials</p>
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <h1 className='text-center'>{pendingTesti + successTesti}</h1>
                        <p className='text-center'>Total</p>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <p><span className='text-primary'>Pending:</span> {pendingTesti}</p>
                        <p><span className='text-success'>Success:</span> {successTesti}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '268px' }} className="col-lg-6 widget">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className='mt-3 ms-3'>Enquires</p>
                        <h1 className='text-center'>{pendingEnquires + successEnquires + rejectedEnquires}</h1>
                        <p className='text-center'>Total</p>
                      </div>
                      <div className="col-lg-6 mt-4">
                        <p><span className='text-success'>Success:</span> {successEnquires}</p>
                        <p><span className='text-warning'>Pending:</span> {pendingEnquires}</p>
                        <p><span className='text-danger'>Rejected:</span> {rejectedEnquires}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: '185px' }} className="widget mt-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className='mt-3 ms-3'>Alerts</p>
                        <h1 className='text-center'>{activeAlerts + pendinAlerts + completedAlerts}</h1>
                        <p className='text-center'>Total</p>
                      </div>
                      <div className="col-lg-6 mt-4">
                        <p><span className='text-success'>Active:</span> {activeAlerts}</p>
                        <p><span className='text-warning'>Pending:</span> {pendinAlerts}</p>
                        <p><span className='text-danger'>Completed:</span> {completedAlerts}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-3">
                      <p>Create alerts to notify users about important events.</p>
                      <p>Schedule alerts to be sent at a later time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard