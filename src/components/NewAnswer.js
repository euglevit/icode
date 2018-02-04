import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchAddAnswers} from '../actions/index';
import {Button} from 'react-bootstrap';
import './NewAnswer.css';

class NewAnswer extends Component{
  constructor(...args) {
    super(...args);

    this.state = {loading: true, answerArea : ''};
  }

  //Adds answer to database
  addAnswer(user1,comment1,questionId1){
    this.props.dispatch(fetchAddAnswers({"comment" : comment1,"user" : user1},questionId1));
  }

  //Tracks Changes to textarea
  _onChange = (e) => {
    this.setState({answerArea : e.target.value});    
  }

  //Submits textarea
  _onSubmit = (e) => {
    e.preventDefault();
    let user = '';

    if(this.props.auth === undefined){
      user = '';
    }else(user =  this.props.auth.currentUser.username);

    if(this.state.answerArea === ''){
      return alert('Please Enter Text.');
    }else{
      this.addAnswer(user,this.state.answerArea,this.props.questionId);
      this.setState({answerArea : ''});
    }
  }

  
  render(){

    return(
      <div className='new-answer-button'>
            <form onSubmit={this._onSubmit}>
              <input onChange={this._onChange} value={this.state.answerArea} contentEditable='true' suppressContentEditableWarning id='newAnswer' placeholder='Enter Comment'></input>
              <Button type='submit'className='submitAnswer'>Submit</Button>
            </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    loading: state.newQuestionsReducer.loading,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(NewAnswer);