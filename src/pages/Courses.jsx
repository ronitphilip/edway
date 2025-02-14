import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import SERVER_URL from '../api/serverURL'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchColleges } from '../redux/slices/collegeSlice'
import { fetchCollege } from '../redux/slices/collegeSlice'
import { addCollegeVisitAPI } from '../api/allAPI'

const Courses = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { collegeList, filteredList } = useSelector((state) => state.college);

  const displayView = async (college) => {
    navigate(`/${college._id}/view`, { state: { college } });

    try {
      const result = await addCollegeVisitAPI(college._id)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (dispatch) {
        dispatch(fetchCollege());
    }
  }, [dispatch]);
  
  return (
      <div className="row courses">
        <div className="col-lg-3 border-end">
          <Sidebar collegeList={collegeList}/>
        </div>
        <div className="col">

          <div className="border-bottom p-4">
            <input onChange={e=>dispatch(searchColleges(e.target.value.toLowerCase()))} className='search-box' type="text" placeholder='Collage name'/>
          </div>

          <div>
            <h1 className="text-center mt-3"><span className='text-gradient'>Collages </span></h1>
            <p className='text-center px-5 mx-5'>Explore a curated list of top colleges across India, offering diverse courses to match your ambitions. Filter, search, and read reviews to find the perfect institution for your future.</p>
          </div>

          <div className="row ms-1 my-3">
            
            {
              filteredList?.length>0 ? (
                filteredList?.map((college, index) => (
                  <div key={index} className="col-lg-3 rounded p-3 collage-column">
                    <div onClick={()=>displayView(college)} className="py-2 d-flex flex-column justify-content-between rounded h-100 collage-card">
                      <img src={`${SERVER_URL}/uploads/${college.images?.[0]}`} alt='no img' className="w-100 h-75 rounded collage-image" />
                      <span className='mt-3'>{college.collegename}</span>
                      <p className="text-secondary mb-0">{college.location?.[0]?.state}</p>
                    </div>
                  </div>
                ))) : (
                  collegeList?.map((college, index) => (
                    <div key={index} className="col-lg-3 rounded p-3 collage-column">
                      <div onClick={()=>displayView(college)} className="py-2 d-flex flex-column justify-content-between rounded h-100 collage-card">
                        <img src={`${SERVER_URL}/uploads/${college.images?.[0]}`} alt='no img' className="w-100 h-75 rounded collage-image" />
                        <span className='mt-3'>{college.collegename}</span>
                        <p className="text-secondary mb-0">{college.location?.[0]?.state}</p>
                      </div>
                    </div>
                )
              ))
            }
            
          </div>

        </div>
      </div>
  )
}

export default Courses