import React,{Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import {Popover,Overlay,Button} from 'react-bootstrap';
import './Sidebar.css';

export default class NavBar extends Component{
  constructor(props, context) {
    super(props, context);
  
      this.handleClick = e => {
        this.setState({ target: e.target, show: !this.state.show });
        // console.log('res123','popover');
      };
    
      this.state = { show: false };
  }

  handleToggleClick(event) {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    let el = document.querySelector('.wrapper');
    el.classList.toggle('menuDisplayed'); 
  }

  render(){

    return(
      <div className='navbar'>
        <p onClick={this.handleToggleClick} id='menu-toggle'><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true">Topics</span></p>
        <h1>iCode</h1>
        <p onClick={this.handleClick}>
          Login
        </p>
        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={this}
          containerPadding={20}
        >
          <Popover id="popover-contained" title="Popover bottom">
            <LoginForm />
          </Popover>
        </Overlay>
      </div>
    )
  }
}