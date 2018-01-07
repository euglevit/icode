import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sidebar.css';

export default function NavBar() {
  function handleToggleClick(event) {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    let el = document.querySelector('.wrapper');
    el.classList.toggle('menuDisplayed');
    
  }
  return(
    <div className='navbar'>
      <p onClick={handleToggleClick} id='menu-toggle'><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></p>
      <h1>iCode</h1>
    </div>
  )
}