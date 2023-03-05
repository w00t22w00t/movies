import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SinglePage from './pages/SinglePage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Components/Layout';
import FavoritesPage from './pages/FavoritesPage';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='favorites' element={<FavoritesPage />} />
        <Route path="movie/:id" element={<SinglePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;


// TODO 
// 1. bttn favorites in MoviesItem.jsx
// 2. favList to redux-toolkit
// 3. create PageMovie.jsx and lazyload