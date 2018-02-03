import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchAddQuestions,fetchQuestions}from '../actions/index';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import store from '../store';
import './NewQuestion.css';

class NewQuestion extends Component{

  constructor(...args) {
    super(...args);

    this.state = store.getState();

  }
  

  //Adds Question to Database
  addQuestion(question1,topic1,user1){
    this.props.dispatch(fetchAddQuestions({"question" : question1, "user" : user1, "topic" : topic1})); 
  };

  
  componentDidMount() {
    this.fetchProtectedData();
  }

  //Fetches all questions
  fetchProtectedData = () => {
    this.props.dispatch(fetchQuestions());
  }

  //Submits text area
  _onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let questionArea = document.getElementById('question-ask').value;
    let questionTopicIndex = document.getElementById('selected-topic').selectedIndex
    let questionTopicSelected = document.getElementById('selected-topic').options
    let questionTopic = questionTopicSelected[questionTopicIndex];
    if(questionArea === ""){
      return alert('Please Enter Text.');
    }
    this.addQuestion(questionArea,questionTopic.id,this.state.auth.currentUser.username);
    this.props.history.push(`/questions/${questionTopic.value}`)
  }




  render(){ 
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }  
  return(
    <div className='new-question-form'>
      <h1>New Question</h1>
      <form onSubmit={this._onSubmit} className='newQuestion'>
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
          <textarea id='question-ask' placeholder='What is your question?' minLength='30'></textarea>
          <Button type = 'submit' className='submit-question'>Submit Question</Button>
      </form>
    </div>
    )
  }
}


const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    loggedIn: state.auth.currentUser !== null

  };
};

export default connect(mapStateToProps)(NewQuestion);