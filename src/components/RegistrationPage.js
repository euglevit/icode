import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/questions/javascript" />;
    }
    return (
        <div className="home">

            <div className='nav-links'>
                <Link to={{pathname: '/'}} className='home-link glyphicon glyphicon-home'>Home</Link>
            </div>
            <h2 className='register-header'>Register for iCode</h2>
            <div className='banner'>
                <h2>Welcome To iCode, Where You Can Get Answers To Your Web Development Questions</h2>
            </div>
            
            <RegistrationForm />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);