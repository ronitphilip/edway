import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCollegesAPI } from "../../api/allAPI";

export const fetchCollege = createAsyncThunk("college/fetchCollege", async () => {
    const result = await getAllCollegesAPI()
    return result.data;
});

const collegeSlice = createSlice({
    name: 'college',
    initialState: {
        collegeList: [],
        dummyList: [],
        filteredList : [],
        loading: false,
        errorMsg: '',
        activeLocation: '',
        activeCourse: '',
        update: true,
        LocationUpdate: true,
    },
    reducers: {
        searchColleges : (state, actionByHeader) => {
            state.collegeList = state.dummyList.filter(item=>item.collegename.toLowerCase().includes(actionByHeader.payload))
        },
        sortByLocation : (state, actionBySiderbar) => {
            state.filteredList = state.dummyList.filter(item=>item.location[0].state.toLowerCase().includes(actionBySiderbar.payload))
            state.LocationUpdate = false;
        },
        sortByCourse: (state, action) => {
            const selectedCollegeIds = action.payload;

            state.filteredList = state.dummyList.filter(college => 
                selectedCollegeIds.includes(college._id)
            );
            state.update = false;
        },
        resetFilters: (state) => {
            state.filteredList = [];
            state.activeLocation = '';
            state.activeCourse = '';
            state.update = true;
            state.LocationUpdate = true;
        },
        setActiveCourse: (state, action) => {
            state.activeCourse = action.payload;
        },
        setActiveLocation: (state, action) => {
            state.activeLocation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollege.fulfilled, (state, action) => {
            const sortedColleges = action.payload.sort((a, b) => b.visits - a.visits);
            state.collegeList = sortedColleges;
            state.dummyList = sortedColleges;
            state.loading = false;
        });        
        builder.addCase(fetchCollege.pending, (state) => {
            state.loading = true;
            state.errorMsg = '';
        });
        builder.addCase(fetchCollege.rejected, (state) => {
            state.loading = false;
            state.errorMsg = 'API call failed';
        });
    },
});

export const { searchColleges, sortByLocation, sortByCourse, resetFilters, setActiveCourse, setActiveLocation } = collegeSlice.actions;
export default collegeSlice.reducer;
