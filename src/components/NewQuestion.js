import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addQuestion}from '../actions/index';
import {Form, FormControl, Button} from 'react-bootstrap';

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
      <div>
        <h1>new question</h1>
        <Form inline className='newQuestion'>
          <legend>Topic</legend>
            <select id='selected-topic'> 
              <option id='javascript' value='javascript'>Javascript</option>
              <option id='jquery' value='jquery'>jQuery</option>
              <option id='node' value='node'>Node</option>
              <option id='react' value='react'>React</option>
              <option id='ajax' value='ajax'>Ajax</option>
              <option id='git' value='git'>Git</option>
            </select>
            <legend>Question</legend>
            <FormControl id='question-ask' placeholder='What is your question'/>
            <Button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              let questionArea = document.getElementById('question-ask').value;
              let questionTopicIndex = document.getElementById('selected-topic').selectedIndex
              let questionTopicSelected = document.getElementById('selected-topic').options
              let questionTopic = questionTopicSelected[questionTopicIndex];
              let newDate = new Date();
              this.addQuestion(questionArea,questionTopic.id,'user2',newDate,Math.floor((Math.random()*100000)+1),[])
              console.log('NewQuestion', this);
            }}
            className='submit-question'>Submit Question
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