import React,{Component} from 'react';
import Answers from './Answers';
import IndividualQuestion from './IndividualQuestion';
import {connect} from 'react-redux';
import {BrowserRouter as Route,Link} from 'react-router-dom';
import './Questions.css';
import {fetchQuestions} from '../actions/index';


class Questions extends Component {
  constructor(...args) {
    super(...args);

    this.state = {loading : true};
  }

  //Creates a list of all Questions
  createList() {
    let thisTopic = this.props.match.params.topic.toLowerCase();
    
    return this.props.questions.map((question) => {
      if(thisTopic === question.topic){
        return(
        <IndividualQuestion 
        key={question._id}
        id={question._id}
        user={question.user}
        date={new Date(question.date).toLocaleDateString()}
        time={new Date(question.date).toLocaleTimeString()}
        question={question.question}
        comments={question.comments}
        history={this.props.history}
          />
        )
      }
      else return null
    })
  }
  handleClick(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchProtectedData();
  }

  fetchProtectedData = () => {
    this.props.dispatch(fetchQuestions());
  }

  render() {
    let thisTopic = this.props.match.params.topic.toLowerCase();

    let questionLength = this.props.questions.filter(question => {
      return question.topic === thisTopic;
    })
    if(this.props.loading){
      return <div></div>
    }
    return(
      <div className='outer-padding'>
        <div>
          <div className='nav-links'>
            <Link className='home-link' to={{pathname: `/`}}>Home</Link>
            <span className='arrows'> >> </span>
            <Link className='topic-link' to={{pathName: `/topics/${this.props.match.params.topic}`}}>{this.props.match.params.topic}</Link>
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
          <div className='topic-header-wrapper'>
          </div>
          <div className='questions-header'>
          <div className='header-topics'>
            <p>{questionLength.length} {this.props.match.params.topic.toUpperCase()} Questions</p>
          </div>
          <div className='list-group total-question-ul'>{this.createList()}</div>
          <Route path='/answers/:question' component={Answers}></Route>
        </div>
        </div>
      </div>
      
    )
  }     
}
const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    loading : state.newQuestionsReducer.loading,
    loggedIn: state.auth.currentUser !== null
  };
};

export default connect(mapStateToProps)(Questions);