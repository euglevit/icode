import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addQuestion}from '../actions/index';

class NewQuestion extends Component{
  // handleClick(event){
  //   console.log('this click was handled');
  //   console.log(this);
  // }
  addQuestion(question,topic,user,date){
    console.log(question,topic,user);
    this.props.dispatch(addQuestion(question,topic,user,date));
  };

    render(){
    return(
      <div>
        <h1>new question</h1>
        <form className='newQuestion'>
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
            <textarea id='question-ask' placeholder='What is your question'></textarea>
            <button 
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              let questionArea = document.getElementById('question-ask').value;
              let questionTopicIndex = document.getElementById('selected-topic').selectedIndex
              let questionTopicSelected = document.getElementById('selected-topic').options
              let questionTopic = questionTopicSelected[questionTopicIndex];
              console.log('questionArea, ', questionArea)
              console.log(questionTopic.id)
              this.addQuestion(questionArea,questionTopic.id,'user2',Date.now())
              console.log('NewQuestion', this);
            }}
            className='submit-question'>Submit Question
            </button>
        </form>
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