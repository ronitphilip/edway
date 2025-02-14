import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { getAllTestimonialsAPI, updateTestimonialAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';

const Testimonials = () => {
  const token = sessionStorage.getItem('adminToken');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [activeTesti, setActiveTesti] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllTestimonialsAPI(headers)
      .then((res) => {
        if (res.status === 200) {
          setTestimonials(res.data);
          filterTestimonials(res.data, activeTesti);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filterTestimonials = (testimonials, isActive) => {
    const filtered = testimonials.filter(
      (testi) => (isActive ? testi.status === 'success' : testi.status === 'pending')
    );
    setFilteredTestimonials(filtered);
  };

  const handleToggle = () => {
    const newActiveState = !activeTesti;
    setActiveTesti(newActiveState);
    filterTestimonials(testimonials, newActiveState);
  }

  const updateTesi = async (id, newstatus) => {

    try {
      const result = await updateTestimonialAPI(id, { status: newstatus }, headers);

      if (result.status === 200) {
        const updatedTestimonials = testimonials.map((testi) =>
          testi._id === id ? { ...testi, status: newstatus } : testi
        );
        setTestimonials(updatedTestimonials);

        filterTestimonials(updatedTestimonials, activeTesti);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <>
      <div className="row ed-minheight">
        <div className="col-lg-3">
          <Sidebar />
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mt-3">Testimonials</h1>
            <button
              className={`btn ${activeTesti ? 'btn-primary' : 'btn-warning'} h-25`}
              onClick={handleToggle}
            >
              {activeTesti ? 'Show Pending' : 'Show Active'}
            </button>
          </div>

          <div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>#</th>
                  <th style={{ width: '50%' }}>Testimonials</th>
                  <th style={{ width: '20%' }}>Users</th>
                  <th style={{ width: '20%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((testi, index) => (
                  <tr key={testi._id}>
                    <td style={{ width: '10%' }}>{index + 1}</td>
                    <td style={{ width: '50%' }}>{testi.message}</td>
                    <td style={{ width: '20%' }}>{testi.userId?.username}</td>
                    <td style={{ width: '20%' }}>
                      <div>
                        {
                          activeTesti ? (
                            <button className='btn btn-danger' onClick={() => updateTesi(testi._id, 'pending')}>
                              Hide
                            </button>
                          ) : (
                            <button className='btn btn-success' onClick={() => updateTesi(testi._id, 'success')}>
                              Show
                            </button>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;