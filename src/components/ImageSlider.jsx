import React, { useEffect, useState } from 'react'
import { fetchCollege } from '../redux/slices/collegeSlice'
import { useDispatch, useSelector } from 'react-redux'
import SERVER_URL from '../api/serverURL'

const ImageSlider = () => {

    const dispatch = useDispatch()
    const [collegeData, setCollegeData] = useState([])

    useEffect(() => {
        if (dispatch) {
            dispatch(fetchCollege());
        }
    }, [dispatch]);

    const { collegeList } = useSelector((state) => state.college);

    useEffect(() => {
        if (collegeList.length > 0) {
            fetchCollegeData()
        }
    }, [collegeList])

    const fetchCollegeData = () => {
        const tempData = collegeList.slice(0,5).map(college => ({
            id: college._id,
            name: college.collegename,
            image: college.images?.[0] || ''
        }));
        setCollegeData(tempData)
    }

    const locateTo = (id) => {
        window.location.href = `/${id}/view`
    }

    return (
        <>
            <div
                className="slider my-4 ed-heigh"
                style={{
                    '--width':'400px',
                    '--height':'300px',
                    '--quantity':'5'
                }}
            >
                <div className="list">
                    {
                        collegeData.length > 0 && collegeData.map((college, index) => (
                            <div
                                key={index}
                                onClick={()=>locateTo(college.id)}
                                className="item rounded pb-5"
                                style={{'--position': index+1}}
                            >
                                <img className='rounded' src={`${SERVER_URL}/uploads/${college.image}`} alt="no img" />
                                <p className='text-center mt-3'>{college.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ImageSlider