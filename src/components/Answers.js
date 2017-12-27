import React,{Component} from 'react';
import Questions from './Questions';
import NewAnswer from './NewAnswer';
import {BrowserRouter as Link,Route,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';


class Answers extends Component{

  createList(){
    let thisQuestion = this.props.match.params.question;
  
    return this.props.questions.map((question) => {
      if(thisQuestion === question.id){
        return question.comments.map((comment) => {
          return(this.props.answers.map((answer) => {
            if(comment.answerid === answer.id){
              return (
                <li className='list-group-item'>{answer.comment}</li>
              )
            }
          }))
        })
      }
    })
  }

  render(){
    let thisQuestion = this.props.match.params.question;
    console.log(thisQuestion);
    let headerQuestion = this.props.questions.map((question) => {
      console.log(question.id);
      if(thisQuestion == question.id){
        console.log('questionid',question);
        return question.question;
      }
    })
    let headerId = this.props.questions.map((question) => {
      console.log(question.id);
      if(thisQuestion == question.id){
        console.log('questionid',typeof(question.id));
        return question.id;
      }
    })
    headerId = headerId.filter((header) => {
      return typeof header === 'string';
    })
    
  console.log('header',typeof(headerId));
    return (
      <div>
        <h1>{headerQuestion}</h1>
        <NewAnswer questionId={headerId} />
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