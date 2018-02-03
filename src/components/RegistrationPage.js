import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="home">

            <div className='nav-links'>
                <Link to={{pathname: '/'}} className='home-link'>Home</Link>
            </div>
            <h2 className='register-header'>Register for iCode</h2>
            <div className='banner'>
                <p className="banner-header">iCode FORUM</p>
                <div className='banner-div'>
                <p className="banner-topic">Welcome</p>
                <p>Welcome To iCode, Where You Can Get Answers To Your Web Development Questions. Start By Registering, Or Click On A Topic Below That Interests You</p>
                <p className='banner-topic'><Link to="/register">Register</Link></p>
                <p>Register For iCode So You Could Post Questions And Help Other Users Get Answers To Their Questions</p>
                </div>
            </div>
            
            <RegistrationForm />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);