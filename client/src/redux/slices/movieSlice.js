import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState:{
        nowPlaying : [],
        popular: [],
        topRated: [],
        upcoming: [],
    },
    reducers:{
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popular = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRated = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcoming = action.payload;
        },
    }
})

export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } = movieSlice.actions;

export default movieSlice.reducer;