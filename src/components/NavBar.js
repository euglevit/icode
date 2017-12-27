import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sidebar.css';

export default function NavBar() {
  function handleToggleClick(event) {
    console.log(this);
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    console.log('toggle');
    let el = document.querySelector('.wrapper');
    el.onclick = function() {
      console.log('toggled');
      el.classList.toggle('menuDisplayed');
    }
  }
  return(
    <div className='navbar'>
      <p onClick={handleToggleClick.bind()} className='btn btn-success' id='menu-toggle'>Toggle</p>
      <h1>iCode</h1>
      <button><Link to={{pathname: '/new'}}>New Question</Link></button>
    </div>
  )
}