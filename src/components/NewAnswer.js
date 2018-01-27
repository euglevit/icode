import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchAddAnswers} from '../actions/index';
import {Form, Button} from 'react-bootstrap';
import store from '../store';
import './NewAnswer.css';

class NewAnswer extends Component{
  constructor(...args) {
    super(...args);

    this.state = {loading: true};
  }

  componentWillUpdate(nextProps,nextState){
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  addAnswer(user1,comment1,questionId1){
    this.props.dispatch(fetchAddAnswers({"comment" : comment1,"user" : user1},questionId1));
    // this.props.dispatch(fetchAnswers());
  }
  render(){
    let user = ''
    if(this.state.auth === undefined){
      user = '';
    }else(user =  this.state.auth.currentUser.username);

    return(
      <div className='new-answer-button'>
            <Form>
              <div contentEditable='true' id='newAnswer' placeholder='Enter Comment' ref='textarea'></div>
              <Button type='submit'
              onClick= {(event) => {
                event.preventDefault();
                event.stopPropagation();
                let answerArea = this.refs.textarea.innerText;
                if(answerArea == undefined){
                  return alert('Please enter text');
              }else(this.addAnswer(user,this.refs.textarea.innerText,this.props.questionId))
              }}
              className='submitAnswer'>
              Submit
              </Button>
            </Form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    loading: state.newQuestionsReducer.loading
  };
};

export default connect(mapStateToProps)(NewAnswer);