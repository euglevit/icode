import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,} from 'react-router-dom';
import {fetchQuestions,fetchAnswers} from '../actions/index';
import './LandingPage.css';

class LandingPage extends Component{

    constructor(...args) {
      super(...args);
  
      this.state = {loading : true};
    }

    componentDidMount(){
      this.fetchQuestions()
    }

    //Fetches all Questions and answers
    fetchQuestions = () => {
      this.props.dispatch(fetchQuestions());
      this.props.dispatch(fetchAnswers());
    }


    render(){
    if(this.props.loading){
      return ''
    }
    return (
        <div className="home">
          <div className='nav-links'>
            <Link to={{pathname: '/'}} className='home-link'>Home</Link>
          </div>
          <div className='banner'>
            <p className="banner-header">iCode FORUM</p>
            <div className='banner-div'>
              <p className="banner-topic">Welcome</p>
              <p>Welcome To iCode, Where You Can Get Answers To Your Web Development Questions. Start By Registering, Or Click On A Topic Below That Interests You.</p>
              {this.props.loggedIn ?
              <div>
              <p className='banner-topic'><Link to="/new">New</Link></p>
              <p>Have A Question? Click Here To Post It To iCode And Get An Answer ASAP!</p>
              </div>
              :
              <div>
              <p className='banner-topic'><Link to="/register">Register</Link></p>
              <p>Register For iCode So You Could Post Questions And Help Other Users Get Answers To Their Questions.</p>
              </div>
              }
            </div>
          </div>
            <div>
            <div className='table-wrapper'>
              <div className='header-topics'>
                <p>Forum Topics</p>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Javascript'><Link to={{pathname: '/questions/Javascript'}}>Javascript</Link></p>
                  <p>Learn about the world's most popular programming language.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='javascript').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='jQuery'><Link to={{pathname: '/questions/jQuery'}}>jQuery</Link></p>
                  <p>Find answers about a popular Javascript library.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='jquery').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Node'><Link to={{pathname: '/questions/Node'}}>Node</Link></p>
                  <p>Learn about a popular Javascript runtime environment.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='node').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='React'><Link to={{pathname: '/questions/React'}}>React</Link></p>
                  <p>Learn about a popular Javascript framework.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='react').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Ajax'><Link to={{pathname: '/questions/Ajax'}}>Ajax</Link></p>
                  <p>Find out more about creating asynchronous client side Web Applications.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='ajax').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
              <div className='main-table-topics'>
                <div className='question-topic'>
                  <p className='topic' name='Git'><Link to={{pathname: '/questions/Git'}}>Git</Link></p>
                  <p>Learn more about a popular version control system.</p>
                  <p className='post-count'>{this.props.questions.filter(question => question.topic==='git').length} posts</p>
                </div>
                <div className='user-pic'><img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='32px' width='32px'/><p>{this.props.questions.filter(question => question.topic === 'javascript').pop().user}</p></div>
              </div>
            </div>
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