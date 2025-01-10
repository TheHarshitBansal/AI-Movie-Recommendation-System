import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        playingNowMovies: 1,
        upcomingMovies: 1,
        popularMovies: 1,
        topRatedMovies: 1,
        airingTodayShows: 1,
        popularShows: 1,
        topRatedShows: 1,
    },
    reducers: {
        incrementPlayingNowMovies: (state) => {
            state.playingNowMovies += 1;
        },
        incrementUpcomingMovies: (state) => {
            state.upcomingMovies += 1;
        },
        incrementPopularMovies: (state) => {
            state.popularMovies += 1;
        },
        incrementTopRatedMovies: (state) => {
            state.topRatedMovies += 1;
        },
        incrementAiringTodayShows: (state) => {
            state.airingTodayShows += 1;
        },
        incrementPopularShows: (state) => {
            state.popularShows += 1;
        },
        incrementTopRatedShows: (state) => {
            state.topRatedShows += 1;
        },
        decrementPlayingNowMovies: (state) => {
            state.playingNowMovies -= 1;
        },
        decrementUpcomingMovies: (state) => {
            state.upcomingMovies -= 1;
        },
        decrementPopularMovies: (state) => {
            state.popularMovies -= 1;
        },
        decrementTopRatedMovies: (state) => {
            state.topRatedMovies -= 1;
        },
        decrementAiringTodayShows: (state) => {
            state.airingTodayShows -= 1;
        },
        decrementPopularShows: (state) => {
            state.popularShows -= 1;
        },
        decrementTopRatedShows: (state) => {
            state.topRatedShows -= 1;
        },

    }

})
export const { incrementPlayingNowMovies, incrementUpcomingMovies, incrementPopularMovies, incrementTopRatedMovies, incrementAiringTodayShows, incrementPopularShows, incrementTopRatedShows, decrementAiringTodayShows,decrementPlayingNowMovies, decrementPopularMovies,decrementPopularShows,decrementTopRatedMovies,decrementTopRatedShows,decrementUpcomingMovies } = pageSlice.actions;

export default pageSlice.reducer;