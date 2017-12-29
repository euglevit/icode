import React from 'react';
import NavBar from './NavBar';
import About from './About';
// import Topics from './Topics';
import Questions from './Questions';
import Answers from './Answers';
import NewQuestion from './NewQuestion';
import Sidebar from './Sidebar';
import './HomePage.css';
import {BrowserRouter as Router, Route, Links} from 'react-router-dom';


export default function HomePage(){

  
  return(
    <div className='wrapper'>
        <NavBar />
        <div>   
          <Sidebar />
        </div>
        <div className='main-content'>
          {/* <About /> */}
          {/* <Topics /> */}
          <Route path='/questions/:topic' component={Questions}></Route>
          <Route path='/answers/:question' component={Answers}></Route>
          <Route path='/new' component={NewQuestion}></Route>
        </div>
    </div>
  )
}