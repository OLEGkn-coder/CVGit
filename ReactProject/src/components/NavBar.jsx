import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
 return (
  <div className = "navbar">
    <NavLink to = '/datepage' className = "nav-button one" alt = "one">1</NavLink>
    <NavLink to = '/timepage' className = "nav-button two" alt = "two">2</NavLink>
    <NavLink to = '/songpage' className = "nav-button three" alt = "three">3</NavLink>
    <NavLink to = '/donatepage' className = "nav-button four" alt = "four">4</NavLink>
    <NavLink to = '/commentpage' className = "nav-button five" alt = "five">5</NavLink>
  </div>
 )
}

export default NavBar;