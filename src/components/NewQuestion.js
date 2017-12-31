import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addQuestion}from '../actions/index';
import {Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NewQuestion.css';

class NewQuestion extends Component{
  // handleClick(event){
  //   console.log('this click was handled');
  //   console.log(this);
  // }
  addQuestion(question,topic,user,date,id,comments){
    this.props.dispatch(addQuestion(question,topic,user,date,id,comments));
  };



    render(){
      
    return(
      <div className='new-question-form'>
        <h1>New Question</h1>
        <Form inline className='newQuestion'>
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
              let newDate = new Date();
              let newId = (Math.floor((Math.random()*100000)+1)).toString();
              this.addQuestion(questionArea,questionTopic.id,'user2',newDate,newId,[]);
              this.props.history.push(`/questions/${questionTopic.value}`)
            }}
            className='submit-question'>
            Submit Question
            </Button>
        </Form>
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

export default connect(mapStateToProps)(NewQuestion);