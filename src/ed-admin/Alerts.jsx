import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Sidebar from './Sidebar';
import { createAlertAPI, getAllAlertsAPI, updateAlertAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';

const Alerts = () => {
  const token = sessionStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    scheduledAt: "",
    status: "pending"
  });

  useEffect(() => {
    getAllAlertsAPI(headers).then((res) => {
      if (res.status === 200) {
        setAlerts(res.data);
        filterAlerts(res.data, selectedStatus);
      }
    }).finally(() => setIsLoading(false));
  }, []);

  const filterAlerts = (alerts, status) => {
    const filtered = alerts.filter((alert) => alert.status === status);
    setFilteredAlerts(filtered);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    filterAlerts(alerts, newStatus);
  };

  const updateAlertStatus = async (id, newStatus) => {
    try {
      const res = await updateAlertAPI(id, { status: newStatus }, headers);
      if (res.status === 200) {
        const updatedAlerts = alerts.map((alert) =>
          alert._id === id ? { ...alert, status: newStatus } : alert
        );
        setAlerts(updatedAlerts);

        filterAlerts(updatedAlerts, selectedStatus);
      }
    } catch (error) {
      console.error("Error updating alert status:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({ ...newAlert, [name]: value });
  };

  const handleCreateAlert = async () => {
    console.log(newAlert);
    
    try {
      const res = await createAlertAPI(newAlert, headers);
      if (res.status === 200) {
        alert('New alert added!');
        setAlerts([...alerts, res.data]);
        filterAlerts([...alerts, res.data], selectedStatus);
        setShowAdd(false);
        setNewAlert({ title: "", message: "", scheduledAt: "", status: "pending" });
      }
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="row ed-minheight">
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mt-3">Alerts</h1>

          <select className="form-select w-auto" value={selectedStatus} onChange={handleStatusChange}>
            <option value="active">Show Active</option>
            <option value="pending">Show Pending</option>
            <option value="completed">Show Completed</option>
          </select>
        </div>

        <h4 className='mt-3'>{selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Alerts</h4>
        <div className="row mt-3">
          <div className="col-lg-4 mb-4">
            {showAdd ? (
              <div style={{ height: '300px' }} className="card d-flex flex-row">
                <div className="card-body d-flex flex-column justify-content-evenly">
                  <input className='form-control' type="text" name="title" value={newAlert.title} onChange={handleInputChange} placeholder='Title'/>
                  <textarea style={{ height: '120px' }} className='form-control' name="message" value={newAlert.message} onChange={handleInputChange} placeholder='New notification'></textarea>
                  <div className="d-flex justify-content-between">
                    <input className='form-control' type="date" name="scheduledAt" value={newAlert.scheduledAt} onChange={handleInputChange}/>
                    <select className="form-select" name="status" value={newAlert.status} onChange={handleInputChange}>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button onClick={handleCreateAlert} className="btn btn-primary">Post</button>
                  </div>
                </div>
                <div className="d-flex align-items-start pe-2 mt-1">
                  <button onClick={() => setShowAdd(false)} className='btn p-0 m-0'>
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ height: '200px' }} className="card d-flex align-items-center justify-content-center">
                <button onClick={() => setShowAdd(true)} className='btn'>Create alert</button>
                <button onClick={() => setShowAdd(true)} style={{ height: '30px', width: '30px', border: '2px solid black', borderRadius: '50%' }} className='d-flex align-items-center justify-content-center'>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
          </div>

          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <div key={index} className="col-lg-4  mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h5 className="card-title">{alert.title}</h5>
                      <p className='text-secondary'>{format(new Date(alert.createdAt), "MMM dd, yyyy")}</p>
                    </div>
                    <p className="card-text">{alert.message}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0">Scheduled: {format(new Date(alert.scheduledAt), "MMM dd, yyyy")}</p>

                      <select
                        className="form-select"
                        value={alert.status}
                        onChange={(e) => updateAlertStatus(alert._id, e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-4">
              <p>No {selectedStatus} alerts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;