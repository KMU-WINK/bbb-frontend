import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/main" className="nav-item">
        홈
      </NavLink>
      <NavLink to="/bookshelf" className="nav-item">
        책장
      </NavLink>
      <NavLink to="/notes" className="nav-item">
        노트
      </NavLink>
    </nav>
  );
};

export default NavBar;