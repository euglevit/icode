import React,{Component} from 'react';
import Questions from './Questions';
import NewAnswer from './NewAnswer';
import UserTag from './UserTag';
import {BrowserRouter as Link,Route,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Edit from './Edit';
import {Button} from 'react-bootstrap';
import './Answers.css';


class Answers extends Component{

  createList(){
    let thisQuestion = this.props.match.params.question;
    
  
    return this.props.questions.map((question) => {
      if(thisQuestion === question.id){
        return question.comments.map((comment) => {
          return(this.props.answers.map((answer) => {
            if(comment.answerid === answer.id){
              let answerId = answer.id;
              return (
                <li className={`list-group-item comment`} id={`a${answerId}`}><p>{answer.comment}</p>
                  <UserTag 
                  user = {answer.user}
                  date={question.date.toLocaleDateString()}
                  time={question.date.toLocaleTimeString()}
                  />
                  <Edit user={answer.user} keys={answerId} comment={answer.comment}/>
                </li>
              )
            }
          }))
        })
      }
    })
  }

  render(){
    let thisQuestion = this.props.match.params.question;
    let headerQuestion = this.props.questions.map((question) => {
      if(thisQuestion == question.id){
        return question.question;
      }
    })

    let userTagInfo = this.props.questions.map((question) => {
      if(thisQuestion == question.id) {
        console.log(question.date.toLocaleDateString());
        return question.user;
      }
    })

    let userTagDate = this.props.questions.filter((question) => {
      if(thisQuestion == question.id) {
        let userInfo = {date : question.date, time : question.date.toLocaleTimeString()}
        return userInfo.date;
      }
    })
    
    return (
      <div>
        <div className='total-question list-group-item total-question-ul'>
          <p class='asked-question'>{headerQuestion}</p>
          <UserTag
            user={userTagInfo}
            date={userTagDate[0].date.toLocaleDateString()}
            time={userTagDate[0].date.toLocaleTimeString()}
          />
        </div>
        <NewAnswer questionId={this.props.match.params.question} />
        <h2><ul className='list-group'>{this.createList()}</ul></h2>
      </div>
    )
  } 
}
const mapStateToProps = state => {
  return{
    questions: state.questions,
    answers: state.answers
  };
};
export default withRouter(connect(mapStateToProps)(Answers));