import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
  movies: [],
  filteredMovies: [],
  genres: [],
  loading: false,
  fetching: true,
  currentPage: 1,
  recommendations: [],
  search: ''
}

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (currentPage, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`)
    currentPage === 1 ? dispatch(setMovies(res.data)) :  dispatch(updateMovies(res.data))
  }
)

export const getRecommendations = createAsyncThunk(
  'movies/getRecommendations',
  async (movie_id, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    dispatch(setRecommendations(res.data))
  }
)

export const getGenres = createAsyncThunk(
  'movies/getGenres',
  async (_, {rejectWithValue, dispatch}) => {
    const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    dispatch(setGenres(res.data))
  }
)

export const getSearchMovies = createAsyncThunk(
  'movies/getSearchMovies',
  async (searchParams, {rejectWithValue, dispatch}) => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchParams.word}&page=${searchParams.page}&include_adult=false`)
    searchParams.page === 1 ? dispatch(setMovies(res.data)) :  dispatch(updateMovies(res.data))
  }
)

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.results
      state.filteredMovies = action.payload.results
    },
    updateMovies: (state, action) => {
      const nonExistingElements = action.payload.results.filter(targetObj =>
        !state.movies.some(obj => obj.id === targetObj.id)
      );

      state.movies = [...state.movies, ...nonExistingElements]
      state.filteredMovies = [...state.filteredMovies, ...nonExistingElements]
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setGenres: (state, action) => {
      state.genres = action.payload.genres
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload.results
    },
  },
  extraReducers: {
    [getMovies.fulfilled]: (state) => {
      state.fetching = false
      state.loading = false
    },
    [getMovies.pending]: (state) => {
      state.loading = true
    },
    [getMovies.rejected]: (state) => {
      state.loading = false
    },

    [getSearchMovies.fulfilled]: (state) => {
      state.fetching = false
      state.loading = false
    },
    [getSearchMovies.pending]: (state) => {
      state.loading = true
    },
    [getSearchMovies.rejected]: (state) => {
      state.loading = false
    },
  }
})

export const {setMovies, updateMovies, setSearch, setGenres, setFetching, setCurrentPage, setRecommendations} = movieSlice.actions
export default movieSlice.reducer