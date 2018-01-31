import React,{Component} from 'react';
import NavBar from './NavBar';
import Questions from './Questions';
import Answers from './Answers';
import NewQuestion from './NewQuestion';
// import Sidebar from './Sidebar';
import LandingPage from './LandingPage.js';
import RegistrationPage from './RegistrationPage';
import './HomePage.css';
import {connect} from 'react-redux';
import {refreshAuthToken} from '../actions/auth'
import {fetchQuestions,fetchAnswers} from '../actions/index';
import {Route, withRouter} from 'react-router-dom';


class HomePage extends Component{

  constructor(...args) {
    super(...args);

    this.state = {loading : true};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 // One hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
  }
  componentDidMount(){
    this.fetchQuestions()
  }

  //Fetches all Questions and Answers
  fetchQuestions = () => {
    this.props.dispatch(fetchQuestions());
    this.props.dispatch(fetchAnswers());
  } 

  render(){
    return(
      <div className='wrapper'>
          <NavBar />
          {/* <Sidebar /> */}
          <div className='main-content'>
            <Route exact path='/' component={LandingPage}/>
              <Route path='/questions/:topic' component={Questions}/>
              <Route path="/register" component={RegistrationPage}/>
              <Route path='/answers/:question' component={Answers}/>
              <Route path='/new' component={NewQuestion}/>
          </div>
          <div className='footer'>
            <p>euglevit</p>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    questions: state.questions,
    answers: state.newQuestionsReducer.answers,
    loading : state.newQuestionsReducer.loading,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

export default withRouter(
  connect(mapStateToProps)(HomePage)
);