import React, { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Header from '../components/Header';
import { useLocation, useParams } from 'react-router-dom';
import SERVER_URL from '../api/serverURL';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, searchCourses } from '../redux/slices/courseSlice';
import { addBookmarkAPI, addCommentsAPI, addCourseAPI, deleteCourseAPI, getACollegeAPI, getCommentsAPI, reportCommentAPI } from '../api/allAPI';

const View = () => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const commentSection = useRef(null)
    const [collegeData, setCollegeData] = useState([]);
    const [collegeImg, setCollegeImg] = useState([]);
    const [comments, setComments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [replies, setReplies] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newRating, setNewRating] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [replyToComment, setreplyToComment] = useState(null);
    const [showReplies, setShowReplies] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showCourses, setShowCourses] = useState(true);
    const [allCourses, setAllCourses] = useState([]);
    const [reportCommetId, setReportCommentId] = useState('')
    const [reportReason, setReportReason] = useState('')
    const [courseData, setCourseData] = useState({
        collegeId: "",
        coursename: "",
        fees: '',
        duration: "",
        description: ""
    });
    const { college } = location.state || {};
    const { courseList } = useSelector((state) => state.courses);

    const adminToken = sessionStorage.getItem('adminToken')
    const headers = {
        'Authorization': `Bearer ${adminToken}`,
    }

    useEffect(() => {
        if (courseList.length > 0) {
            const allCoursesArray = courseList.flatMap(college => college.courses);

            if (showCourses) {
                setAllCourses(allCoursesArray.slice(0, 4));
            } else {
                setAllCourses(allCoursesArray);
            }
        } else {
            return setAllCourses([])
        }
    }, [showCourses, courseList]);

    useEffect(() => {
        if (college) {
            setCollegeData(college);
            setCollegeImg(college?.images?.[0]);
        } else {
            getACollege()
        }
    }, [college])

    useEffect(() => {
        getComments();
        dispatch(fetchCourses(params.id));
    }, [params.id, dispatch]);

    useEffect(() => {
        if (comments.length > 0) {
            const activeComments = comments.filter(comment => comment.status !== 'inactive');

            const reviewList = activeComments.filter(comment => !comment.parentCommentId);
            const replyList = activeComments.filter(comment => comment.parentCommentId);
            setReviews(reviewList);
            setReplies(replyList);
            avgReviews(reviewList);
        }
    }, [comments]);

    const getComments = async () => {
        try {
            const result = await getCommentsAPI(params.id);
            setComments(result.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    const avgReviews = (reviews) => {
        if (reviews.length > 0) {
            const total = reviews.reduce((sum, review) => sum + (review?.rating || 0), 0);
            const avg = total / reviews.length;
            setAverageRating(avg);
        } else {
            setAverageRating(0);
        }
    };

    const getEmoji = (rating) => {
        if (rating > 4.5) return '😀';
        if (rating >= 4) return '😊';
        if (rating >= 3) return '😐';
        if (rating >= 2) return '🙁';
        if (rating >= 1) return '😔';
        return '';
    };

    const addReview = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('Please login to add a review');
            window.location.href = '/login'
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        if (newMessage) {
            if (newRating === 0) {
                alert('Please give a rating!');
                return;
            }

            const newRatingBody = {
                collegeId: params.id,
                userId: JSON.parse(sessionStorage.getItem('user'))?._id,
                message: newMessage,
                rating: newRating,
            };

            try {
                const result = await addCommentsAPI(newRatingBody, headers);
                if (result.status === 200) {
                    getComments();
                    setNewMessage('');
                    setNewRating(0);
                }
            } catch (err) {
                console.error('Error adding review:', err);
            }
        } else {
            alert('Please enter a review');
        }
    };

    const addReply = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('Please login to add a reply');
            window.location.href = '/login'
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        if (newMessage) {
            const replyBody = {
                collegeId: params.id,
                userId: JSON.parse(sessionStorage.getItem('user'))?._id,
                message: newMessage,
                parentCommentId: replyToComment,
            };

            console.log(replyBody);


            try {
                const result = await addCommentsAPI(replyBody, headers);
                if (result.status === 200) {
                    getComments();
                    setNewMessage('');
                    setreplyToComment(null);
                }
            } catch (err) {
                console.error('Error adding reply:', err);
            }
        } else {
            alert('Please enter a reply');
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies(showReplies === commentId ? null : commentId);
    };

    const buildReplyTree = (parentId) => {
        const replyMap = {};

        replies.forEach(reply => {
            replyMap[reply._id] = { ...reply, children: [] };
        });

        replies.forEach(reply => {
            if (reply.parentCommentId?._id && replyMap[reply.parentCommentId._id]) {
                replyMap[reply.parentCommentId._id].children.push(replyMap[reply._id]);
            }
        });

        return Object.values(replyMap).filter(reply => reply.parentCommentId?._id === parentId);
    };

    const renderReplies = (replyList, replyTo) => {
        return replyList.map((reply) => (
            <div key={reply._id} className="mb-2">
                <div className="d-flex flex-column">
                    <div>
                        <span className="text-secondary font-small">@{reply?.userId?.username} to {replyTo}</span>
                        <span className="text-secondary font-small ms-2">
                            {formatDistanceToNow(new Date(reply?.createdAt), { addSuffix: true })}
                        </span>
                        <button onClick={() => reportComment(reply?._id)} className='btn text-secondary font-small'><i className="fa-regular fa-flag"></i></button>
                    </div>
                    <p className="mb-0">{reply?.message}</p>
                    <span onClick={() => setreplyToComment(reply._id)} className="text-secondary me-3 font-small">Reply</span>
                    {replyToComment === reply?._id && (
                        <div className="w-100 d-flex flex-row">
                            <input onChange={(e) => setNewMessage(e.target.value)} className="p-0 text-light commentbox" type="text" placeholder={`Reply to @${reply?.userId?.username || 'user'}`} />
                            <button className="border-0 bg-transparent text-light px-2" onClick={addReply}><i className="fa-solid fa-check"></i></button>
                            <button className="border-0 bg-transparent text-light px-2" onClick={() => setreplyToComment(null)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    )}
                    {reply.children.length > 0 && (
                        <div>{renderReplies(reply.children, reply?.userId?.username)}</div>
                    )}
                </div>
            </div>
        ));
    };

    const bookMark = async () => {

        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('Please login');
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        }
        console.log(params.id, headers);

        try {
            const result = await addBookmarkAPI({ collegeId: params.id }, headers)

            if (result.status === 200) {
                alert('Bookmark added successfully')
            } else if (result.status === 400) {
                alert(result.response.data)
            }
            else {
                alert('Failed to add bookmark')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const scrollToSection = () => {
        commentSection.current.scrollIntoView({ behavior: 'smooth' });
    };

    const getACollege = async () => {
        try {
            const result = await getACollegeAPI(params.id)
            if (result.status === 200) {
                setCollegeData(result.data)
                setCollegeImg(result?.data?.images?.[0]);
            } else {
                console.log(result.data);
            }
        } catch (err) {
            console.log(err);
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

    const reportComment = (reviewId) => {
        setShowOverlay(true)
        setReportCommentId(reviewId)
    }

    const handleReportComment = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('Please login to add a review');
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        }

        if (reportReason == '')
            return alert('Please select a reason for reporting the comment')

        const reqBody = {
            commentId: reportCommetId,
            reason: reportReason
        }

        try {
            const result = await reportCommentAPI(reqBody, headers)
            if (result.status === 200) {
                setShowOverlay(false)
                setReportCommentId(null)
                setReportReason('')
                alert('Comment reported successfully')
            } else if (result.status === 400) {
                setShowOverlay(false)
                setReportCommentId(null)
                setReportReason('')
                alert(result.response.data)
            } else {
                alert('Failed to report comment, try again later!')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const openAddCourse = () => {
        setCourseData({ ...courseData, collegeId: params.id })
        setShowAdd(true)
    }

    const addCourse = async () => {
                
        try {
            const result = await addCourseAPI(courseData, headers)
            if (result.status === 200) {
                alert('Course added successfully')
                dispatch(fetchCourses(params.id));
                setCourseData({
                    ...courseData,
                    collegeId: "",
                    coursename: "",
                    fees: '',
                    duration: "",
                    description: ""
                })
                setShowAdd(false)
            } else {
                alert('Failed to add course, try again later!')
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteCourse = async (courseId) => {
        const collegeId = params.id;
    console.log(courseId, collegeId);
    
        try {
            const result = await deleteCourseAPI(collegeId, courseId, headers);
            if (result.status === 200) {
                dispatch(fetchCourses(params.id));
                alert('Course removed!');
            } else {
                alert('Failed to remove course, try again later!');
                console.log(result.response);
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <>

            <Header />

            <div className="row">
                {/* college images */}
                <div className="col-lg-8 p-5 d-flex flex-row justify-content-between">
                    <div style={{ height: '500px' }} className="d-flex flex-column justify-content-between">
                        {collegeData?.images?.map((image, index) => (
                            <div key={index}>
                                <img onClick={() => setCollegeImg(image)} className="rounded" width={'100px'} height={'80px'} src={`${SERVER_URL}/uploads/${image}`} alt="no img" />
                            </div>
                        ))}
                    </div>
                    <img className="rounded" height={'500px'} width={'750px'} src={`${SERVER_URL}/uploads/${collegeImg}`} alt="no img" />
                </div>
                {/* courses */}
                <div style={{ height: '500px' }} className="col-lg-4 px-5">
                    <div className="pt-5">
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <input onChange={(e) => dispatch(searchCourses(e.target.value.toLowerCase()))} type="text" className="search-box" placeholder="Search" />
                            {
                                adminToken && <button onClick={openAddCourse} className='btn btn-primary h-50'>Add course</button>
                            }
                        </div>
                        <div>
                            {allCourses?.length > 0 ? (
                                allCourses?.map((course, index) => (
                                    <ul key={index}>
                                        <li>
                                            <div className="d-flex justify-content-between align-items-center">
                                                {course?.coursename}
                                                {
                                                    adminToken && <button onClick={()=>deleteCourse(course?._id)} className='btn text-danger'><i className="fa-solid fa-trash"></i></button>
                                                }
                                            </div>
                                        </li>
                                        <ul>
                                            <li>Fee: {course?.fees}</li>
                                            <li>Duration: {course?.duration}</li>
                                            <li>{course?.description}</li>
                                        </ul>
                                    </ul>
                                ))
                            ) : (
                                <p>No courses found!!</p>
                            )}

                            {
                                allCourses?.length > 3 && (
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-link' onClick={() => setShowCourses(!showCourses)}>{showCourses ? 'show more...' : 'show less'}</button>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

            <div className="row px-5">
                {/* college name */}
                <div className="col-lg-8 d-flex flex-row justify-content-between">
                    <h4>{collegeData?.collegename}</h4>
                    <div>
                        <span className="fs-5 me-3">{getEmoji(averageRating)}</span>
                        <button onClick={scrollToSection} className="border-0 bg-transparent p-0 m-0"><i className="fs-5 fa-solid fa-comment text-light me-3"></i></button>
                        <button onClick={bookMark} className="border-0 bg-transparent p-0 m-0"><i className="fs-5 fa-solid fa-bookmark text-light me-3"></i></button>
                        <button onClick={() => shareCollege(collegeData)} className="border-0 bg-transparent p-0 m-0"><i className="fs-5 fa-solid fa-share text-light me-3"></i></button>
                    </div>
                </div>
                {/* location */}
                <div className="d-flex mt-2">
                    <h5><i className="fa-solid fa-location-dot"></i></h5>
                    {collegeData?.location?.map((location, index) => (
                        <div key={index} className="ms-3">
                            <p>
                                {location?.locality +
                                    ', ' +
                                    location?.street +
                                    ', ' +
                                    location?.district +
                                    ', ' +
                                    location?.state +
                                    ', ' +
                                    location?.pincode}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="col"></div>
            </div>

            <div ref={commentSection} className="row me-5 pe-5">
                {/* add review */}
                <div className="col-lg-8 mx-5 py-3 my-3">
                    <div className="d-flex flex-row align-items-center">
                        {newRating === 0 ? (
                            <>
                                <span onClick={() => setNewRating(5)} className="p-3 smile me-2">😀</span>
                                <span onClick={() => setNewRating(4)} className="p-3 smile me-2">😊</span>
                                <span onClick={() => setNewRating(3)} className="p-3 smile me-2">😐</span>
                                <span onClick={() => setNewRating(2)} className="p-3 smile me-2">🙁</span>
                                <span onClick={() => setNewRating(1)} className="p-3 smile me-2">😔</span>
                            </>
                        ) : (
                            <span onClick={() => setNewRating(0)} className="p-3 smile me-2">
                                {getEmoji(newRating)}
                            </span>
                        )}
                        <input onChange={(e) => setNewMessage(e.target.value)} id="newsletterbox" className="mx-3" type="text" placeholder="Add review" />
                        <button onClick={addReview} className="btn btn-primary">Post</button>
                    </div>
                    {/* add reply */}
                    <div className="my-3">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <span style={{ height: '30px', width: '30px' }} className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center">
                                                {review?.rating
                                                    ? getEmoji(review?.rating)
                                                    : review?.userId?.username.charAt(0).toUpperCase()}
                                            </span>
                                            <div className="d-flex flex-column mx-4">
                                                <div>
                                                    <span className="font-small">@{review?.userId?.username}</span>
                                                    <span className="text-secondary font-small ms-3">
                                                        {formatDistanceToNow(new Date(review?.createdAt), {
                                                            addSuffix: true,
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="mb-0">{review?.message}</p>
                                                <div>
                                                    <span onClick={() => setreplyToComment(review?._id)} className="text-secondary me-3 font-small">Reply</span>
                                                    <span onClick={() => toggleReplies(review?._id)} className="text-secondary font-small" style={{ cursor: "pointer" }}>{showReplies === review?._id ? "Hide replies" : "Show replies"}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => reportComment(review?._id)} className="btn"><i className="fa-solid fa-circle-info text-light fs-5"></i></button>
                                    </div>
                                    <div className="ps-5 ms-4">

                                        {replyToComment === review?._id && (
                                            <div className="w-100 d-flex flex-row">
                                                <input onChange={(e) => setNewMessage(e.target.value)} className="p-0 text-light commentbox" type="text" placeholder={`Reply to @${review?.userId?.username || 'user'}`} />
                                                <button className="border-0 bg-transparent text-light px-2" onClick={addReply}><i className="fa-solid fa-check"></i></button>
                                                <button className="border-0 bg-transparent text-light px-2" onClick={() => setreplyToComment(null)}><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                        )}

                                        {/* nested replay */}
                                        {
                                            showReplies === review._id && renderReplies(buildReplyTree(review._id), review?.userId?.username)
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="ms-4">No reviews yet!</p>
                        )}
                    </div>

                </div>
            </div>

            {
                showOverlay && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <div className="d-flex justify-content-end">
                                <button className='btn p-0' onClick={() => setShowOverlay(false)}><i className="fa-solid fa-xmark text-light fs-5"></i></button>
                            </div>
                            <p><i className="fa-solid fa-triangle-exclamation"></i> Report comment</p>
                            <div className="d-flex form-check ms-3 mb-2">
                                <input onChange={(e) => setReportReason(e.target.value)} className="form-check-input" type="checkbox" value="Hateful or abusive language" id="defaultCheck1" />
                                <label className="form-check-label ms-3" htmlFor="defaultCheck1">
                                    Hateful or abusive language
                                </label>
                            </div>
                            <div className="d-flex form-check ms-3 mb-2">
                                <input onChange={(e) => setReportReason(e.target.value)} className="form-check-input" type="checkbox" value="Harassment or bullying" id="defaultCheck2" />
                                <label className="form-check-label ms-3" htmlFor="defaultCheck2">
                                    Harassment or bullying
                                </label>
                            </div>
                            <div className="d-flex form-check ms-3 mb-2">
                                <input onChange={(e) => setReportReason(e.target.value)} className="form-check-input" type="checkbox" value="Misinformation" id="defaultCheck3" />
                                <label className="form-check-label ms-3" htmlFor="defaultCheck3">
                                    Misinformation
                                </label>
                            </div>
                            <div className="form-floating mx-3 mb-2">
                                <textarea onChange={(e) => setReportReason(e.target.value)} className="text-dark form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label className='text-dark' htmlFor="floatingTextarea">Other...</label>
                            </div>
                            <div>
                                <button onClick={handleReportComment} className='btn btn-light'>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showAdd && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <div className="d-flex justify-content-end">
                                <button className='btn p-0' onClick={() => setShowAdd(false)}><i className="fa-solid fa-xmark text-light fs-5"></i></button>
                            </div>
                            <p>Add new course</p>
                            <div>
                                <div className="mb-2">
                                    <p className='text-start mb-1'>Course name</p>
                                    <input type="text" className="form-control" value={courseData.coursename} onChange={e => setCourseData({ ...courseData, coursename: e.target.value })} required />
                                </div>
                                <div className="mb-2">
                                    <p className='text-start mb-1'>Course fees</p>
                                    <input type="text" className="form-control" value={courseData.fees} onChange={e => setCourseData({ ...courseData, fees: e.target.value })} required />
                                </div>
                                <div className="mb-2">
                                    <p className='text-start mb-1'>Course duration</p>
                                    <input type="text" className="form-control" value={courseData.duration} onChange={e => setCourseData({ ...courseData, duration: e.target.value })} required />
                                </div>
                                <div className="mb-2">
                                    <p className='text-start mb-1'>Course description</p>
                                    <input type="text" className="form-control" value={courseData.description} onChange={e => setCourseData({ ...courseData, description: e.target.value })} required />
                                </div>
                                <div className="pt-2">
                                    <button onClick={addCourse} className='btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default View;