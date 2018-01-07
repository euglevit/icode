import React,{Component} from 'react';
import Questions from './Questions';
import NewAnswer from './NewAnswer';
import UserTag from './UserTag';
import {BrowserRouter as Link,Route,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Edit from './Edit';
import {Button} from 'react-bootstrap';
import store from '../store';
import './Answers.css';


class Answers extends Component{

  // constructor(props){
  //   super(props);

  //   this.state = store.getState();


  //   store.subscribe(() => {
  //   console.log('res123', this);
  //   this.setState(store.getState());
  //   });
  // }

  componentWillUpdate(nextProps,nextState){
    console.log('yobe');
    this.state = store.getState();
    console.log('res123',this);
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  createList(){
    let thisQuestion = this.props.match.params.question;
    console.log(thisQuestion);
    
  
    return this.props.questions.map((question) => {
      if(thisQuestion === question._id){
        return question.comments.map((comment) => {
          if(question.user === comment.user){
              return (
                <li className={`list-group-item comment`} id={`a${comment._id}`}><p>{comment.comment}</p>
                  <UserTag 
                  user = {comment.user}
                  date={new Date(question.date).toLocaleDateString()}
                  time={new Date(question.date).toLocaleTimeString()}
                  />
                  <Edit user={comment.user} keys={comment._id} comment={comment.comment}/>
                </li>
              )
            }else{
              return (
                <li className={`list-group-item comment`} id={`a${comment._id}`}><p>{comment.comment}</p>
                  <UserTag 
                  user = {comment.user}
                  date={new Date(question.date).toLocaleDateString()}
                  time={new Date(question.date).toLocaleTimeString()}
                  />
                </li>
              )
            }
          })
        }
      })
    }

  render(){
    console.log('res12345',this.props);
    
    let thisQuestion = this.props.match.params.question;
    let headerQuestion = this.props.questions.map((question) => {
      if(thisQuestion == question._id){
        return question.question;
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

    console.log(thisQuestion,headerQuestion,userTagInfo,userTagDate);
    
    return (
      <div>
        <div className='total-question list-group-item total-question-ul'>
          <p className='asked-question'>{headerQuestion}</p>
          <UserTag
            user={userTagInfo}
            date={new Date(userTagDate[0].date).toLocaleDateString()}
            time={new Date(userTagDate[0].date).toLocaleTimeString()}
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