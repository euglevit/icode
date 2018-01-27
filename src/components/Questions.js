import React,{Component} from 'react';
import Answers from './Answers';
import IndividualQuestion from './IndividualQuestion';
import {connect} from 'react-redux';
import {BrowserRouter as Route,Link} from 'react-router-dom';
import './Questions.css';
import { fetchProtectedData } from '../actions/protected-data';


class Questions extends Component {
  constructor(...args) {
    super(...args);

    this.state = {loading : true};
  }

  createList() {
    let thisTopic = this.props.match.params.topic.toLowerCase();
    

    
    return this.props.questions.reverse().map((question) => {
      if(thisTopic === question.topic){
        return(
        <IndividualQuestion 
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
    })
  }
  handleClick(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchProtectedData();
  }

  fetchProtectedData = () => {
    this.props.dispatch(fetchProtectedData());
  }

  choosePicture() {
    let pic =
      {
        Javascript:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJXtjZwB6zdB4WoHDMyBDvX-4Xk3zbU_Z7tGKH-jyWPCXwWHv1xw',
        jQuery: 'https://avatars0.githubusercontent.com/u/70142?s=200&v=4',
        Node: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzZDbbYL2rzTcPlRaNXe7eWxZ1pray0VDpxZKwsztrVGumPnjnA',
        React: 'https://cdn-images-1.medium.com/max/1600/1*qUlxDdY3T-rDtJ4LhLGkEg.png',
        Ajax: 'https://static.hltv.org/images/team/logo/7558',
        Git: 'https://avatars1.githubusercontent.com/u/18133?s=400&v=4'
      }
      if(this.props.match.params.topic.toLowerCase() === 'javascript'){
        return pic.Javascript;
      }else if(this.props.match.params.topic.toLowerCase() === 'jquery'){
        return pic.jQuery;
      }else if(this.props.match.params.topic.toLowerCase() === 'node'){
        return pic.Node;
      }else if(this.props.match.params.topic.toLowerCase() === 'react'){
        return pic.React;
      }else if(this.props.match.params.topic.toLowerCase() === 'ajax'){
        return pic.Ajax;
      }else if(this.props.match.params.topic.toLowerCase() === 'git'){
        return pic.Git;
      }
    }
    
  
  render() {
    
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
          <div className='topic-header-wrapper'>
            <div className='topic-header'>
              <h1>{this.props.match.params.topic}</h1>
              <img alt='topic-pic' src={this.choosePicture()} height='100' width='120'></img>
    <div>{this.props.loggedIn ? <a onClick={(event => {
      event.stopPropagation();
      event.preventDefault();
      this.props.history.push('/new');
    })} className='navbar-button'>New Question</a> : <div></div>}</div>
            </div>
          </div>
          <div className='questions-header'>
          <div className='all-questions-header'>
            <div className='all-questions-user'>
              <p>User</p>
            </div>
            <div className='all-questions-question'>
              <p>Questions</p>
            </div>
            <div className='all-questions-last-post'>
              <p>User</p>
            </div>
            <div className='all-questions-comment-count'>
              <p>Count</p>
            </div>
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