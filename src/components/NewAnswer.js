import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addAnswer} from '../actions/index'

class NewAnswer extends Component{

  addAnswer(id,user,comment,questionId){
    console.log('NewAnswer',questionId);
    this.props.dispatch(addAnswer(id,user,comment,questionId));
  }

  render(){
    console.log('Answer',this.props.questionId);
    return(
      <div>
        <textarea id='newAnswer' placeholder='Enter Comment'></textarea>
        <button 
        onClick= {(event) => {
          event.preventDefault();
          event.stopPropagation();
          let answerArea = document.getElementById('newAnswer').value;
          this.addAnswer((Math.floor((Math.random()*100000)+1)).toString(),'user2',answerArea,this.props.questionId);
        }}
        className='submitAnswer'>Submit</button>
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

export default connect(mapStateToProps)(NewAnswer);