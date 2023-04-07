import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './../App.scss';


const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className='App-header__logo'>Movies App</h1>

          <ul className="App-header__menu">
            <li><Link to='/'>Main</Link></li>
            <li><Link to='/favorites'>Favorites</Link></li>
          </ul>
        </div>
      </header>
      <Outlet />
      <footer>
        <div className="container">
          <div className='copyright'>© 2023 Random Company. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
