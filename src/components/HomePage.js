import React,{Component} from 'react';
import NavBar from './NavBar';
import About from './About';
// import Topics from './Topics';
import Questions from './Questions';
import Answers from './Answers';
import NewQuestion from './NewQuestion';
import Sidebar from './Sidebar';
import LandingPage from './LandingPage.js';
import Test from './Test';
import RegistrationPage from './RegistrationPage';
import RegistrationForm from './RegistrationForm';
import './HomePage.css';
import {connect} from 'react-redux';
import {refreshAuthToken} from '../actions/auth'
import {fetchQuestions,fetchAnswers} from '../actions/index';
import {Router, Route, Links, withRouter} from 'react-router-dom';


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

  fetchQuestions = () => {
    this.props.dispatch(fetchQuestions());
    this.props.dispatch(fetchAnswers());
  } 

  render(){
    return(
      <div className='wrapper'>
          <NavBar />
          <div>   
            <Sidebar />
          </div>
          <div className='main-content'>
            <LandingPage />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path='/questions/:topic' component={Questions}></Route>
            <Route path='/answers/:question' component={Answers}></Route>
            <Route path='/new' component={NewQuestion}></Route>
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