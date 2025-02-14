import { configureStore } from "@reduxjs/toolkit";
import collegeSlice from './slices/collegeSlice';
import courseSlice from './slices/courseSlice';

const collegeStore = configureStore({
    reducer: {
        college: collegeSlice,
        courses: courseSlice
    },
});

export default collegeStore;