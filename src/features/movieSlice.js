import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
  movies: [],
  filteredMovies: [],
  genres: [], // а нужно ли?
  loading: false,
  fetching: true,
  currentPage: 1,
  recommendations: []
}

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (currentPage, { rejectWithValue, dispatch }) => {
    console.log(currentPage)
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=26ac3f2370b5a5e3c4c1c1973e8006c4&language=en-US&page=${currentPage}`)
    currentPage === 1 ? dispatch(setMovies(res.data)) :  dispatch(updateMovies(res.data))
  }
)

export const getRecommendations = createAsyncThunk(
  'movies/getRecommendations',
  async (movie_id, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=26ac3f2370b5a5e3c4c1c1973e8006c4&language=en-US&page=1`)
    dispatch(setRecommendations(res.data))
  }
)

export const getGenres = createAsyncThunk(
  'movies/getGenres',
  async (_, {rejectWithValue, dispatch}) => {
    const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=26ac3f2370b5a5e3c4c1c1973e8006c4&language=en-US')
    dispatch(setGenres(res.data))
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
      state.movies = [...state.movies, ...action.payload.results]
      state.filteredMovies = [...state.filteredMovies, ...action.payload.results]
    },
    searchMovies: (state, action) => {
      state.filteredMovies = state.movies.filter(function(item, index) {
        return item.title.toLowerCase().includes(action.payload.word.toLowerCase()) && 
        (item.genre_ids.includes(action.payload.genre.id) || action.payload.genre.value == 'all');
      })
    },
    setGenres: (state, action) => {
      state.genres = action.payload.genres
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = state.currentPage + 1
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
    }
  }
})

export const {setMovies, updateMovies, searchMovies, setGenres, setFetching, setCurrentPage, setRecommendations} = movieSlice.actions
export default movieSlice.reducer