import React from 'react';
import {Link} from 'react-router-dom';
import './Topics.css';


export default function Topics(){
  function handleClick(event) {
    
    event.preventDefault();

  }
  return(
    <div className='topics'>
      <ul className='topicsList'>
        <li onClick={handleClick} className='topic' name='Javascript'><Link to={{pathname: '/questions/Javascript'}}>Javascript</Link></li>
        <li onClick={handleClick} className='topic' name='jQuery'><Link to={{pathname: '/questions/jQuery'}}>jQuery</Link></li>
        <li onClick={handleClick} className='topic' name='Node'><Link to={{pathname: '/questions/Node'}}>Node</Link></li>
        <li onClick={handleClick} className='topic' name='React'><Link to={{pathname: '/questions/React'}}>React</Link></li>
        <li onClick={handleClick} className='topic' name='Ajax'><Link to={{pathname: '/questions/Ajax'}}>Ajax</Link></li>
        <li onClick={handleClick} className='topic' name='Git'><Link to={{pathname: '/questions/Git'}}>Git</Link></li>
      </ul>
    </div>
  )
}
