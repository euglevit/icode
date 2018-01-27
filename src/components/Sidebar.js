import React from 'react';
import {Link} from 'react-router-dom';
// import './Topics.css';
import './Sidebar.css';

export default function Sidebar(){
  function handleClick(event) {
    event.preventDefault();
    let selectedTopic = event.currentTarget.getAttribute('name');
  }

  return (
    <div id='sidebar-wrapper'>
      <ul className='sidebar-nav'>
        <div className='topics'>
          <ul className='topicsList'>
            <li onClick={handleClick} className='sidebar-topic' name='Home'><Link to={{pathname: '/'}}>Home</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='Javascript'><Link to={{pathname: '/questions/Javascript'}}>Javascript</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='jQuery'><Link to={{pathname: '/questions/jQuery'}}>jQuery</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='Node'><Link to={{pathname: '/questions/Node'}}>Node</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='React'><Link to={{pathname: '/questions/React'}}>React</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='Ajax'><Link to={{pathname: '/questions/Ajax'}}>Ajax</Link></li>
            <li onClick={handleClick} className='sidebar-topic' name='Git'><Link to={{pathname: '/questions/Git'}}>Git</Link></li>
          </ul>
        </div>
      </ul>
    </div>
  )
}