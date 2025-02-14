import commonAPI from './commonAPI'
import SERVER_URL from './serverURL'

// registerAPI
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// loginAPI
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// getAllImgsAPI
export const getAllImgsAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/images`)
}

// getAllCollegesAPI
export const getAllCollegesAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/colleges`)
}

//getACollegeAPI
export const getACollegeAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_URL}/${id}/colleges`)
}

// getCourseAPI
export const getCourseAPI = async (collegeId) => {
    return await commonAPI("GET", `${SERVER_URL}/${collegeId}/get-course`)
}

// getAllCoursesAPI
export const getAllCoursesAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/courses`)
}

// getCommentsAPI
export const getCommentsAPI = async (collegeId) => {
    return await commonAPI("GET", `${SERVER_URL}/${collegeId}/get-comment`)
}

// addCommentsAPI
export const addCommentsAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/add-comment`, reqBody, { headers })
}

// addBookmarkAPI
export const addBookmarkAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/save-college`, reqBody, { headers })
}

// getSavedCollegesAPI
export const getSavedCollegesAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/get-saved`, {}, { headers })
}

// removeSavedCollegeAPI
export const removeSavedCollegeAPI = async (collegeId, headers = {}) => {
    return await commonAPI("DELETE", `${SERVER_URL}/${collegeId}/remove-saved`, {}, { headers });
};

// addTestimonyAPI
export const addTestimonyAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/add-testimonial`, reqBody, { headers })
}

// deleteTestimonyAPI
export const deleteTestimonyAPI = async (headers = {}) => {
    return await commonAPI("DELETE", `${SERVER_URL}/delete-testimonial`, {}, { headers });
}

// adminLoginAPI
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/admin-login`, reqBody)
}

// createEnquiryAPI
export const createEnquiryAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/create-enquiry`, reqBody)
}

// addCollegeVisitAPI
export const addCollegeVisitAPI = async (id) => {
    return await commonAPI("POST", `${SERVER_URL}/${id}/add-visit`)
}

// reportCommentAPI
export const reportCommentAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/report-comment`, reqBody, { headers })
}

// addViewsAPI
export const addViewsAPI = async () => {
    return await commonAPI("POST", `${SERVER_URL}/add-views`)
}

// admin APIs

// get all users
export const getAllUsersAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/all-users`, {}, { headers })
}

// get all web views
export const getAllViewsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/view-count`, {}, { headers })
}

// get all comments
export const getAllCommentsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/all-comments`, {}, { headers })
}

// get all testimonials
export const getAllTestimonialsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/all-testimonials`, {}, { headers })
}

// get all enquires
export const getAllEnquiresAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/all-enquiries`, {}, { headers })
}

// get all alerts
export const getAllAlertsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/all-alerts`, {}, { headers })
}

// delete user
export const deleteUserAPI = async (id, headers = {}) => {
    return await commonAPI("DELETE", `${SERVER_URL}/user/${id}/delete`, {}, { headers })
}

// delete a college
export const deleteCollegeAPI = async (id, headers = {}) => {
    return await commonAPI("DELETE", `${SERVER_URL}/college/${id}/delete`, {}, { headers })
}

// add a course
export const addCourseAPI = async (data, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/add-course`, data, { headers })
}

// delete a course
export const deleteCourseAPI = async (collegeId, courseId, headers = {}) => {
    return await commonAPI("DELETE", `${SERVER_URL}/course/${collegeId}/${courseId}/delete`, {}, { headers });
};

// get all flagged comments
export const getAllFlaggedCommentsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/flagged-comments`, {}, { headers })
}

// update comment to inactive
export const updateCommentAPI = async (id, headers = {}) => {
    return await commonAPI("PUT", `${SERVER_URL}/comment/${id}/inactive`, {}, { headers })
}

// update testimonial status
export const updateTestimonialAPI = async (id, reqBody, headers = {}) => {
    return await commonAPI("PUT", `${SERVER_URL}/testimonial/${id}/status`, reqBody , { headers })
}

// update alert status
export const updateAlertAPI = async (id, reqBody, headers = {}) => {
    return await commonAPI("PUT", `${SERVER_URL}/alert/${id}/edit`, reqBody, { headers });
};

// create new alert
export const createAlertAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/create-alert`, reqBody, { headers });
};

// update enquiry status
export const updateEnquiryAPI = async (id, reqBody, headers = {}) => {
    return await commonAPI("PUT", `${SERVER_URL}/enquiry/${id}/status`, reqBody, { headers });
};

// update admin password
export const changeAdminPasswordAPI  = async (reqBody, headers = {}) => {
    return await commonAPI("PUT", `${SERVER_URL}/change-password`, reqBody, { headers });
}

// create new admin
export const createAdminAPI = async (reqBody, headers = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/create-admin`, reqBody, { headers });
}

// success testimonials
export const getSuccessTestimonialsAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/success-testimonials`)
}

// get active alerts
export const getActiveAlertsAPI = async (headers = {}) => {
    return await commonAPI("GET", `${SERVER_URL}/active-alerts`, {}, { headers })
}