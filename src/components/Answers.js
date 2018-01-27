import React,{Component} from 'react';
import NewAnswer from './NewAnswer';
import UserTag from './UserTag';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import store from '../store';
import './Answers.css';
import { fetchQuestions, fetchUpdateQuestion } from '../actions/index';
import IndividualAnswer from './IndividualAnswer';


class Answers extends Component{

  constructor(props){
    super(props);

    this.state = store.getState();
    };
  

  componentWillUpdate(nextProps,nextState){
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentDidMount() {
    this.fetchProtectedData();
  }

  fetchProtectedData = () => {
    this.state = store.getState();
    this.props.dispatch(fetchQuestions());
  }

  updateQuestion(question,questionid){
    this.props.dispatch(fetchUpdateQuestion({"question" : question},questionid));
    this.setState({editing : false});
  }

  createList(){
    let thisQuestion = this.props.match.params.question;
    let user = ''
    
    if(this.state.auth.currentUser === null){
      user = '';
    }else(user =  this.state.auth.currentUser.username);
    
  
    return this.props.questions.map(question => {
      if(thisQuestion === question._id){
        return question.comments.map(comment => {
              return (
                // <div>
                <div>
                <IndividualAnswer 
                date={new Date(comment.date).toLocaleDateString()}
                time={new Date(comment.date).toLocaleTimeString()}
                user={user}
                id={comment._id}
                comment={comment.comment}
                questionId={question._id}
                commentUser={comment.user}
                />
                </div>

              )
          })
        }
      })
    }

  _onCancel = (e) => {
    e.preventDefault()
    this.setState({editing:false})

  }

  _onSubmit = (e) => {
    e.preventDefault()


    if(this.refs.textarea1.innerText == ''){
      return alert('Please Enter Text');
    } else(this.updateQuestion(this.refs.textarea1.innerText, this.props.match.params.question));


    
  }

  _onClick = () => {
    
    this.setState({ editing: true })

  }

  render(){
    
    let thisQuestion = this.props.match.params.question;
    let headerQuestion = this.props.questions.map((question) => {
      if(thisQuestion == question._id){
        return question.question;
      }
    })

    let questionIndex = this.props.questions.map((question) => {
      if(thisQuestion == question._id){
        return this.props.questions.indexOf(question)
      }
    })

    let topicQuestion = this.props.questions.map((question) => {
      if(thisQuestion == question._id && question.topic !== undefined){
        
        return question.topic;
      }
    })

    let userTagInfo = this.props.questions.map((question) => {
      if(thisQuestion == question._id) {
        return question.user;
      }
    })

    let userTagDate = this.props.questions.filter((question) => {
      if(thisQuestion == question._id) {
        let userInfo = {date : question.date};
        return userInfo.date;
      }
    })

    let indexTopic = topicQuestion.filter(topic =>{return typeof topic==='string'})
    questionIndex = questionIndex.filter(item => {return typeof item==='number'});
    userTagInfo = userTagInfo.filter(item => {return typeof item==='string'});


    if(this.props.loading){
      return <div></div>
    }
    return (
      <div className='outer-padding'>
        <div>
          <div className='nav-links'>
            <Link className='home-link' to={{pathname: '/'}}>Home</Link> <span className='arrows'> >> </span>
            <Link className='topic-link' to={{pathname: `/questions/${indexTopic}/`}}>{topicQuestion}</Link> <span className='arrows'> >> </span>
            <Link className='question-index-link' to={{pathname: `/answers/${thisQuestion}`}}>Question #{parseInt(questionIndex)+1}</Link>
          </div>
        <div className='total-question-wrapper'>
          <div className='total-question-header'>
            <p>{new Date(userTagDate[0].date).toLocaleDateString()}, {new Date(userTagDate[0].date).toLocaleTimeString()}</p>
          </div>
          <div className='total-question list-group-item total-question-ul'>
            <div className='user-tag'>
              <UserTag
                user={userTagInfo}
                date={new Date(userTagDate[0].date).toLocaleDateString()}
                time={new Date(userTagDate[0].date).toLocaleTimeString()}
              />
            </div>
            <div className='asked-question'>
              <div>{this.state.auth.currentUser && this.state.auth.currentUser.username == userTagInfo ? 
              <div>
              {this.state.editing ? <div>
              <div className='question-edit' contentEditable='true' autoFocus ref='textarea1'>{headerQuestion}</div>
                <div className='edit-answer-functions'>
                  <a className='submit-answer-button' onClick={this._onSubmit.bind(this)}>Submit</a>
                  <a className='cancel-answer-button' onClick={this._onCancel}>Cancel</a>
                </div>
              </div>
              :
              <p className='asked-question'>{headerQuestion}</p> 
              }
                {this.state.auth.currentUser ? <NewAnswer questionId={this.props.match.params.question} />
                : '' }
                <div className='edit-functions'>
                <a className='edit-link' onClick={this._onClick}> 
                  <span>Edit</span>
                </a>
                <a className='delete-link' onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  this.deleteComment(this.props.id,this.props.questionId);
                }}>
                  <span>Delete</span>
                  </a></div>
                </div>
              : 
              <div>
                <p className='asked-question'>{headerQuestion}</p>
                {this.state.auth.currentUser ? <NewAnswer questionId={this.props.match.params.question} />
                : '' }
              </div>           
              }</div>
            </div>
          </div>
        </div>
        
        <div className='list-group'>{this.createList()}</div>
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
    loadin : state.protectedData.loadin,
    editing: false
  };
};
export default withRouter(connect(mapStateToProps)(Answers));