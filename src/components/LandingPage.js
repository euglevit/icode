import React,{Component} from 'react';
import {connect} from 'react-redux';
import Questions from './Questions';
import {Link, Redirect, Route, Router} from 'react-router-dom';
import {fetchQuestions,fetchAnswers} from '../actions/index';
import './LandingPage.css';

import LoginForm from './LoginForm';

class LandingPage extends Component{
    // If we are logged in redirect straight to the user's dashboard

    constructor(...args) {
      super(...args);
  
      this.props = {loading : true};

      if (this.props.loggedIn) {
        return <Redirect to="/questions/javascript" />;
      }
    }
    componentDidMount(){
      this.fetchQuestions()
    }
  
    fetchQuestions = () => {
      this.props.dispatch(fetchQuestions());
      this.props.dispatch(fetchAnswers());
    }


    render(){
      
      if(this.props.loading){
        return <div></div>
      }
    return (
        <div className="home">
          <div className='nav-links'>
            <Link to={{pathname: '/'}} className='home-link'>Home</Link>
            <Link className='register-link' to="/register">Register</Link>
            
          </div>
          <div className='banner'>
            <h2>Welcome To iCode, Where You Can Get Answers To Your Web Development Questions</h2>
          </div>
            <div>
            <div className='table-wrapper'>
              <div className='header-topics'>
                <div className='main-forums'>
                <h2>Main Forums</h2>
                </div>
                <div className='forums-details'>
                  <h2>Last Post</h2>
                </div>
                <div className='forums-details2'>
                  <h2>Questions</h2>
                </div>
                
                </div>
              </div>
              <div className='topics-description'>
                <p>This is the place to access all the main topics available in iCode</p>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Javascript'><Link to={{pathname: '/questions/Javascript'}}>Javascript</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'javascript').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='javascript').length}</p>
                </div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='jQuery'><Link to={{pathname: '/questions/jQuery'}}>jQuery</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'jquery').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='jquery').length}</p>
                </div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Node'><Link to={{pathname: '/questions/Node'}}>Node</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'node').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='node').length}</p>
                </div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='React'><Link to={{pathname: '/questions/React'}}>React</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'react').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='react').length}</p>
                </div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Ajax'><Link to={{pathname: '/questions/Ajax'}}>Ajax</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'ajax').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='ajax').length}</p>
                </div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Git'><Link to={{pathname: '/questions/Git'}}>Git</Link></p>
                </div>
                <div className='last-question'>
                  <p>{this.props.questions.filter(question => question.topic === 'git').pop().question}</p>
                </div>
                <div className='questions-topic'>
                  <p>{this.props.questions.filter(question => question.topic==='git').length}</p>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.newQuestionsReducer.questions,
  answers: state.newQuestionsReducer.answers,
  loading : state.newQuestionsReducer.loading,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);