import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchAddQuestions,fetchQuestions}from '../actions/index';
import {Button} from 'react-bootstrap';
import store from '../store';
import './NewQuestion.css';

class NewQuestion extends Component{

  addQuestion(question1,topic1,user1){
    this.props.dispatch(fetchAddQuestions({"question" : question1, "user" : user1, "topic" : topic1})); 
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




    render(){

      
    return(
      <div className='new-question-form'>
        <h1>New Question</h1>
        <form inline className='newQuestion'>
          <legend>Topic</legend>
            <select id='selected-topic'> 
              <option id='javascript' value='Javascript'>Javascript</option>
              <option id='jquery' value='jQuery'>jQuery</option>
              <option id='node' value='Node'>Node</option>
              <option id='react' value='React'>React</option>
              <option id='ajax' value='Ajax'>Ajax</option>
              <option id='git' value='Git'>Git</option>
            </select>
            <legend>Question</legend>
            <textarea id='question-ask' placeholder='What is your question'></textarea>
            <Button
            type = 'submit'
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              let questionArea = document.getElementById('question-ask').value;
              let questionTopicIndex = document.getElementById('selected-topic').selectedIndex
              let questionTopicSelected = document.getElementById('selected-topic').options
              let questionTopic = questionTopicSelected[questionTopicIndex];
              if(questionArea == undefined){
                return alert('Please Enter Text.');
              }
              this.addQuestion(questionArea,questionTopic.id,this.state.auth.currentUser.username);
              this.props.history.push(`/questions/${questionTopic.value}`)
              
            }}
            className='submit-question'>
            Submit Question
            </Button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers
  };
};

export default connect(mapStateToProps)(NewQuestion);