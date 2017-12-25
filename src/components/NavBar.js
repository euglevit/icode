import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return(
    <div className='navbar'>
      <h1>iCode</h1>
      <button><Link to={{pathname: '/new'}}>New Question</Link></button>
    </div>
  )
}