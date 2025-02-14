import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourseAPI } from "../../api/allAPI";

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (collegeId) => {
    const result = await getCourseAPI(collegeId)
    return result.data;
})

const courseSlice = createSlice({
    name : "courses",
    initialState : {
        courseList : [],
        dummyCourseList: [],
        loading: false,
        errorMsg: '',
    },
    reducers : {
        searchCourses : (state, action) => {
            const searchTerm = action.payload.toLowerCase();

            state.courseList = state.dummyCourseList.map(college => ({
                ...college, courses: college.courses.filter(course => course.coursename.toLowerCase().includes(searchTerm))
            })).filter(college => college.courses.length > 0);
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.courseList = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.dummyCourseList = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.loading = false;
        });
        builder.addCase(fetchCourses.pending, (state) => {
            state.loading = true;
            state.errorMsg = '';
        });
        builder.addCase(fetchCourses.rejected, (state) => {
            state.loading = false;
            state.errorMsg = 'API call failed';
        });
    }
})

export const { searchCourses } = courseSlice.actions;
export default courseSlice.reducer;