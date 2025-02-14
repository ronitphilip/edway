import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollege, searchColleges } from '../redux/slices/collegeSlice';
import SERVER_URL from '../api/serverURL';
import { useNavigate } from 'react-router-dom';
import { deleteCollegeAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';

const Colleges = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [college, setCollege] = useState({
    collegename: "",
    location: {
      locality: "",
      street: "",
      district: "",
      state: "",
      pincode: "",
    },
    images: [""],
    courses: [{ coursename: "", fees: "", duration: "", description: "" }],
  });

  const { collegeList } = useSelector((state) => state.college);

  useEffect(() => {
    dispatch(fetchCollege());
  }, [dispatch]);

  const displayView = (college) => {
    navigate(`/${college._id}/view`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollege({ ...college, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setCollege({ ...college, location: { ...college.location, [name]: value } });
  };

  const handleImageChange = (index, file) => {
    const newImages = [...college.images];
    newImages[index] = file;
    setCollege({ ...college, images: newImages });
  };

  const addImageField = () => {
    setCollege({ ...college, images: [...college.images, null] });
  };

  const removeImageField = (index) => {
    const newImages = college.images.filter((_, i) => i !== index);
    setCollege({ ...college, images: newImages });
  };

  const handleCourseChange = (index, e) => {
    const updatedCourses = [...college.courses];
    updatedCourses[index][e.target.name] = e.target.value;
    setCollege({ ...college, courses: updatedCourses });
  };

  const addCourseField = () => {
    setCollege({ ...college, courses: [...college.courses, { coursename: "", fees: "", duration: "", description: "" }] });
  };

  const removeCourseField = (index) => {
    setCollege({ ...college, courses: college.courses.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("collegename", college.collegename);
    formData.append("locality", college.location.locality);
    formData.append("street", college.location.street);
    formData.append("district", college.location.district);
    formData.append("state", college.location.state);
    formData.append("pincode", college.location.pincode);

    college.images.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    // Append courses as a JSON string
    formData.append("coursearray", JSON.stringify(college.courses));

    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`${SERVER_URL}/add-college`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("College added successfully!");
        dispatch(fetchCollege());
        setShow(true);
      } else {
        alert(data.error || "Failed to add college");
      }
    } catch (error) {
      console.error("Error uploading college:", error);
    }
  };

  const deleteCollege = async (id) => {
    const token = sessionStorage.getItem('adminToken')
    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    try {
      const result = await deleteCollegeAPI(id, headers)
      if (result.status == 200) {
        alert('College deleted successfully')
        dispatch(fetchCollege());
      }else{
        alert('Failed to delete college')
        console.log(result);
      }
    } catch (err) {
      console.log(err)
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
          <h1 className="mt-3">Colleges</h1>

          <div className="d-flex justify-content-between mt-4 px-3">
            <button onClick={() => setShow(!show)} className="btn btn-primary">
              <i className={`fa-solid ${show ? 'fa-plus' : 'fa-arrow-right'}`}></i> {show ? 'Add College' : 'Show Colleges'}
            </button>
            <input
              onChange={(e) => dispatch(searchColleges(e.target.value.toLowerCase()))}
              className="form-control w-25"
              type="text"
              placeholder="Search"
            />
          </div>

          {show ? (
            <div className="row p-2 mt-3">
              {collegeList?.map((college, index) => (
                <div key={index} className="col-lg-4 rounded p-3 collage-column">
                  <div className="py-2 d-flex flex-column justify-content-between rounded h-100 collage-card">
                    <img onClick={() => displayView(college)}  src={`${SERVER_URL}/uploads/${college.images?.[0]}`} alt="no img" className="w-100 h-75 rounded collage-image" />
                    <span className="mt-3">{college.collegename}</span>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className="text-secondary mb-0">{college.location?.[0]?.state}</p>
                      <button style={{position:'relative', zIndex:'5'}} className='btn text-danger' onClick={()=>deleteCollege(college._id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5>Enter college details:</h5>
              <div className="form-div">
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-lg-6'>
                      {/* College Name */}
                      <div className="mb-2">
                        <label>College Name:</label>
                        <input type="text" name="collegename" className="form-control" value={college.collegename} onChange={handleInputChange} required />
                      </div>

                      {/* Location Fields */}
                      <h6>Location:</h6>
                      <div className="mb-2">
                        <input type="text" name="locality" className="form-control" value={college.location.locality} onChange={handleLocationChange} required placeholder='Locality' />
                      </div>
                      <div className="mb-2">
                        <input type="text" name="street" className="form-control" value={college.location.street} onChange={handleLocationChange} placeholder='Street' />
                      </div>
                      <div className="mb-2">
                        <input type="text" name="district" className="form-control" value={college.location.district} onChange={handleLocationChange} required placeholder='District' />
                      </div>
                      <div className="mb-2">
                        <input type="text" name="state" className="form-control" value={college.location.state} onChange={handleLocationChange} required placeholder='State' />
                      </div>
                      <div className="mb-2">
                        <input type="number" name="pincode" className="form-control" value={college.location.pincode} onChange={handleLocationChange} required placeholder='Pincode' />
                      </div>

                      {/* Image Upload */}
                      <h6>Upload Images:</h6>
                      {college.images.map((image, index) => (
                        <div key={index} className="d-flex mb-2">
                          <input type="file" className="form-control" onChange={(e) => handleImageChange(index, e.target.files[0])} required />
                          {index === 0 ? (
                            <button type="button" className="btn btn-success ms-2" onClick={addImageField}>
                              +
                            </button>
                          ) : (
                            <button type="button" className="btn btn-danger ms-2" onClick={() => removeImageField(index)}>
                              -
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className='col-lg-6'>
                      {/* Courses */}
                      <h6>Courses:</h6>
                      {college.courses.map((course, index) => (
                        <div key={index} className="mb-2">
                          <input type="text" name="coursename" placeholder="Course Name" className="form-control mb-2" onChange={(e) => handleCourseChange(index, e)} required />
                          <input type="number" name="fees" placeholder="Fees" className="form-control mb-2" onChange={(e) => handleCourseChange(index, e)} required />
                          <input type="text" name="duration" placeholder="Duration" className="form-control mb-2" onChange={(e) => handleCourseChange(index, e)} />
                          <input type="text" name="description" placeholder="Description" className="form-control mb-2" onChange={(e) => handleCourseChange(index, e)} />
                          <button type="button" className="btn btn-danger mt-2" onClick={() => removeCourseField(index)}>Remove</button>
                          <button type="button" className="btn btn-success mt-2 ms-2" onClick={addCourseField}>+ Add Course</button>
                        </div>
                      ))}
                    </div>

                  </div>
                  {/* Submit Button */}
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Colleges;