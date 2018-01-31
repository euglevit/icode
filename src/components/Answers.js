import React,{Component} from 'react';
import NewAnswer from './NewAnswer';
import UserTag from './UserTag';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import './Answers.css';
import { fetchQuestions, fetchUpdateQuestion } from '../actions/index';
import IndividualAnswer from './IndividualAnswer';


class Answers extends Component{
  //Sets editing for textbox to false.
  state = {
    editing : false
  }

  componentDidMount() {
    this.fetchProtectedData();
  }

  //Fetches Questions when component loads
  fetchProtectedData = () => {
    this.props.dispatch(fetchQuestions());
  }

  //Updates question when user changes words in question. Then sets state of editing to false.
  updateQuestion(question,questionid){
    this.props.dispatch(fetchUpdateQuestion({"question" : question},questionid));
    this.setState({editing : false});
  }

  //Creates a list of all comments available to that quesiton.
  createList(){
    let thisQuestion = this.props.match.params.question;
    let user = ''
    
    if(this.props.auth.currentUser === null){
      user = '';
    }else(user =  this.props.auth.currentUser.username);
    
  
    return this.props.questions.map(question => {
      if(thisQuestion === question._id){
        return question.comments.map(comment => {
              return (
                <IndividualAnswer 
                date={new Date(comment.date).toLocaleDateString()}
                time={new Date(comment.date).toLocaleTimeString()}
                user={user}
                key={comment._id}
                id={comment._id}
                comment={comment.comment}
                questionId={question._id}
                commentUser={comment.user}
                />
              )
          })
        }else return null;
      })
    }

    //Sets editing to false when cancelled.
  _onCancel = (e) => {
    e.preventDefault()
    this.setState({editing:false})

  }

  //When submitted, updateQuestion function is executed
  _onSubmit = (e) => {
    e.preventDefault()


    if(this.refs.textarea1.innerText === ''){
      return alert('Please Enter Text');
    } else(this.updateQuestion(this.refs.textarea1.innerText, this.props.match.params.question));


    
  }

  //Puts editing to true.
  _onClick = () => {
    
    this.setState({ editing: true })

  }

  render(){
    
    let thisQuestion = this.props.match.params.question;
    let headerQuestion = this.props.questions.filter((question) => {
      return thisQuestion === question._id 
    })

    if(this.props.loading){
      return <div></div>
    }
    return (
      <div className='outer-padding'>
        <div>
          <div className='nav-links'>
            <Link className='home-link' to={{pathname: '/'}}>Home</Link> <span className='arrows'> >> </span>
            <Link className='topic-link' to={{pathname: `/questions/${headerQuestion[0].topic}/`}}>{headerQuestion[0].topic}</Link> <span className='arrows'> >> </span>
            <Link className='question-index-link' to={{pathname: `/answers/${thisQuestion}`}}>Question #{parseInt(this.props.questions.indexOf(headerQuestion[0]),10)+1}</Link>
          </div>
        <div className='total-question-wrapper'>
          <div className='total-question-header'>
            <p>{new Date(headerQuestion[0].date).toLocaleDateString()}, {new Date(headerQuestion[0].date).toLocaleTimeString()}</p>
          </div>
          <div className='total-question list-group-item total-question-ul'>
            <div className='user-tag'>
              <UserTag
                user={headerQuestion[0].user}
                date={new Date(headerQuestion[0].date).toLocaleDateString()}
                time={new Date(headerQuestion[0].date).toLocaleTimeString()}
              />
            </div>
            <div className='asked-question'>
              <div>{this.props.auth.currentUser && this.props.auth.currentUser.username === headerQuestion[0].user ? 
              <div>
              {this.state.editing ? <div>
              <div className='question-edit' contentEditable='true' suppressContentEditableWarning autoFocus ref='textarea1'>{headerQuestion[0].question}</div>
                <div className='edit-answer-functions'>
                  <a className='submit-answer-button' onClick={this._onSubmit.bind(this)}>Submit</a>
                  <a className='cancel-answer-button' onClick={this._onCancel}>Cancel</a>
                </div>
              </div>
              :
              <p className='asked-question'>{headerQuestion[0].question}</p> 
              }
                {this.props.auth.currentUser ? <NewAnswer questionId={this.props.match.params.question} />
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
                <p className='asked-question'>{headerQuestion[0].question}</p>
                {this.props.auth.currentUser ? <NewAnswer questionId={this.props.match.params.question} />
                : '' }
              </div>           
              }</div>
            </div>
          </div>
        </div>
        <div key={this.props.questionId} className='list-group'>{this.createList()}</div>
        </div>
      </div>
    )
  } 
}
const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    auth : state.auth,
    loading : state.newQuestionsReducer.loading,
    loadin : state.protectedData.loadin,
  };
};
export default withRouter(connect(mapStateToProps)(Answers));