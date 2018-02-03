import React,{Component} from 'react';
import './NavBar.css';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
class NavBar extends Component{
  constructor(props, context) {
    super(props, context);
  
      this.handleClick = e => {
        this.setState({ target: e.target, show: !this.state.show });
      };
    
      this.state = { show: false };
  }

  
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render(){

    return(
      <div className='navbar'>
        <p className='left-menu' id='menu-toggle'><span className='logo'>iCode</span></p>
    <div className='login-form-div'>{this.props.loggedIn ? <p className='logout-class' onClick={() => this.logOut()}>Logout</p> : <div><LoginForm /></div>}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);