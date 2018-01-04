import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions,fetchAnswers} from '../actions/index';

class Test extends Component{

  componentDidMount() {
    console.log('yo yo yo',this);
    
    this.props.dispatch(fetchQuestions());
    this.props.dispatch(fetchAnswers());
}


  render()  {
    return(
      <h1>hey</h1>
    )

  }
}

const mapStateToProps = state => {
  return{
    questions: state.questions,
    answers: state.answers,
  };
};

export default connect(mapStateToProps)(Test);