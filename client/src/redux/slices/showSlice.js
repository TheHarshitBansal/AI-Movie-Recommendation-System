import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
    name: "show",
    initialState:{
        popular: [],
        topRated: [],
        airingToday: [],
    },
    reducers:{
        addPopularShows: (state, action) => {
            state.popular = action.payload;
        },
        addTopRatedShows: (state, action) => {
            state.topRated = action.payload;
        },
        addAiringTodayShows: (state, action) => {
            state.airingToday = action.payload;
        },
    }
})

export const { addPopularShows, addTopRatedShows, addAiringTodayShows } = showSlice.actions;

export default showSlice.reducer;