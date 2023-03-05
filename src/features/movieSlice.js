import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
  movies: [],
  filteredMovies: [],
  genres: [], // а нужно ли?
  loading: false,
  fetching: true
}

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (currentPage, {rejectWithValue, dispatch}) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=26ac3f2370b5a5e3c4c1c1973e8006c4&language=en-US&page=${currentPage}`)
    dispatch(setMovies(res.data))
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
      console.log('start', state.movies)
      state.movies.push(...action.payload.results)
      state.filteredMovies.push(...action.payload.results)
      // state.movies = [...state.movies, ...action.payload.results]
      // state.filteredMovies = [...state.filteredMovies, ...action.payload.results]
      console.log('end', state.movies)
      // state.filteredMovies = action.payload.results
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
    }
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

export const {setMovies, searchMovies, setGenres, setFetching} = movieSlice.actions
export default movieSlice.reducer








// export const slice = createSlice({
//   name: 'myData',
//   initialState: {
//     data: [],
//     isLoading: false,
//     hasError: false,
//     currentPage: 1,
//     totalPages: 0,
//   },
//   reducers: {
//     fetchDataStart: (state) => {
//       state.isLoading = true;
//       state.hasError = false;
//     },
//     fetchDataSuccess: (state, action) => {
//       state.isLoading = false;
//       state.hasError = false;
//       state.data = [...state.data, ...action.payload.results];
//       state.currentPage = action.payload.page;
//       state.totalPages = action.payload.total_pages;
//     },
//     fetchDataFailure: (state) => {
//       state.isLoading = false;
//       state.hasError = true;
//     },
//   },
// });