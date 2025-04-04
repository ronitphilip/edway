import React, { useEffect, useState } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import { getAllCoursesAPI } from '../api/allAPI';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setActiveCourse, setActiveLocation, sortByCourse, sortByLocation } from '../redux/slices/collegeSlice'

const Sidebar = ({ collegeList }) => {

    const dispatch = useDispatch()
    const { activeLocation, activeCourse, update, LocationUpdate } = useSelector((state) => state.college)
    const [location, setLocation] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [displayCourse, setDisplayCourse] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [show, setShow] = useState(true)
    const [showLoc, setShowLoc] = useState(true)
    console.log(collegeList);

    const itemSlice = () => {
        const uniqueStates = [...new Map(collegeList.map(college => [college.location[0].state, college])).values()];
        setLocation(uniqueStates.slice(0, 3));

        setDisplayCourse(allCourses.slice(0, 3))
    }

    const allLocation = (showLoc) => {
        if (showLoc) {
            const uniqueStates = [...new Map(collegeList.map(college => [college.location[0].state, college])).values()];
            setLocation(uniqueStates);

            setShowLoc(!showLoc)
        } else {
            setLocation(collegeList.slice(0, 3))
            setShowLoc(!showLoc)
        }
    }

    const showAllCourses = (show) => {
        if (show) {
            setDisplayCourse(allCourses)
            setShow(!show)
        } else {
            itemSlice()
            setShow(!show)
        }
    }

    const fetchAllCourses = async () => {
        try {
            const result = await getAllCoursesAPI()
            setFilterCourses(result.data);

            if (result) {
                let uniqueCourses = [];

                result?.data?.forEach(college => {
                    college.courses.forEach(course => {
                        if (!uniqueCourses.includes(course.coursename)) {
                            uniqueCourses.push(course.coursename);
                        }
                    });
                });
                setAllCourses(uniqueCourses)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])

    useEffect(() => {
        itemSlice()
    }, [allCourses])

    const handleSortByLocation = (location) => {
        if (LocationUpdate) {
            dispatch(setActiveLocation(location))
            dispatch(sortByLocation(location.toLowerCase()))
        } else {
            dispatch(resetFilters());
        }
    }

    const handleSortByCourse = (selectedCourse) => {
        if (update) {
            const filteredColleges = filterCourses.filter(college =>
                college.courses.some(course => course.coursename.toLowerCase().includes(selectedCourse.toLowerCase()))
            );

            const filteredCollegeIds = filteredColleges.map(college => college.collegeId._id);

            dispatch(setActiveCourse(selectedCourse))
            dispatch(sortByCourse(filteredCollegeIds))
        } else {
            dispatch(resetFilters())
        }
    };

    return (
        <>
            <div className='p-4'>
                <div className='border-bottom pb-3'>
                    <h1 className='heading'><i className="fa-solid fa-graduation-cap"></i>Edway</h1>
                </div>
                {/* pages */}
                <div className="border-bottom py-3">
                    <span className='nav-item small-text'>Pages</span>
                    <div className='d-flex flex-column'>
                        <Link className='text-light nav-item fs-6 mt-2 ms-3' to={'/'}><i className="fa-solid fa-house me-2"></i> Home</Link>
                        <Link className='text-light nav-item fs-6 mt-2 ms-3' to={'/contact'}><i className="fa-solid fa-phone me-2"></i> Contact</Link>
                        <Link className='text-light nav-item fs-6 mt-2 ms-3' to={'/about'}><i className="fa-solid fa-globe me-2"></i> About</Link>
                    </div>
                </div>
                {/* Courses */}
                <div className="border-bottom py-3">
                    <span className='nav-item small-text'>Courses</span>
                    {
                        update ? (
                            displayCourse.length > 0 && displayCourse.map((course, index) => (
                                <div key={index}>
                                    <span className='ms-3 pointerbtn' onClick={() => handleSortByCourse(course)}>{course}</span>
                                </div>
                            ))
                        ) : (
                            <div className='bg-secondary rounded d-flex justify-content-between' onClick={() => handleSortByCourse(null)}>
                                <button className='ms-3 p-0 bg-transparent border-0 text-light'>{activeCourse}</button>
                                <button className='me-3 p-0 bg-transparent border-0 text-light'><i className="fa-regular fa-circle-xmark"></i></button>
                            </div>
                        )
                    }
                    {update && <button onClick={() => showAllCourses(show)} className='ms-3 btn btn-link p-0'>{show ? 'Show More' : 'Show Less'}</button>}
                </div>
                {/* Location */}
                <div className="border-bottom py-3">
                    <span className='nav-item small-text'>Location</span>
                    {
                        !LocationUpdate ? (
                            <div className='bg-secondary rounded d-flex justify-content-between' onClick={() => handleSortByLocation(null)}>
                                <button className='ms-3 p-0 bg-transparent border-0 text-light'>{activeLocation}</button>
                                <button className='me-3 p-0 bg-transparent border-0 text-light'><i className="fa-regular fa-circle-xmark"></i></button>
                            </div>

                        ) : (
                            location.length > 0 && location.map((college, index) => (
                                <div key={index}>
                                    <button className='ms-3 p-0 bg-transparent border-0 text-light' onClick={() => handleSortByLocation(college.location[0].state)}>{college.location[0].state}</button>
                                </div>
                            ))
                        )
                    }
                    {LocationUpdate && location.length > 3 ?
                        <button onClick={() => allLocation(showLoc)} className='ms-3 btn btn-link border-0 p-0'>{showLoc ? 'Show More' : 'Show Less'}</button>
                        : null}
                </div>
            </div>
        </>
    )
}

export default Sidebar