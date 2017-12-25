import React,{Component} from 'react';
import Questions from './Questions';
import {BrowserRouter as Link,Route,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class Answers extends Component{

  createList(){
    console.log(this.props.match.params.question);
    let thisQuestion = this.props.match.params.question;

    return this.props.questions.map((question) => {
      if(thisQuestion === question.id){
        return question.comments.map((comment) => {
          console.log(comment.answerid);
          return(this.props.answers.map((answer) => {
            if(comment.answerid === answer.id){
              return (
                <li>{answer.comment}</li>
              )
            }
          }))
        })
      }
    })


  }
  render(){
    return (
      <h1>{this.createList()}</h1>
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