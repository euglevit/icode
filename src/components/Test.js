import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions,fetchAnswers} from '../actions/index';

class Test extends Component{

  constructor(...args) {
    super(...args);

    this.state = {loading : true};
  }
  componentDidMount(){
    this.fetchQuestions()

  }
  fetchQuestions = () => {
    this.props.dispatch(fetchQuestions());
    this.props.dispatch(fetchAnswers());
  } 

  render()  {
    console.log('res123', this);
    if(this.props.loading){
      return <h1>loading</h1>
    }
    return(
      <div>{this.props.questions.map(question => (
        <h1 key={question._id}>{question.question}</h1>
      ))}</div>
    )

  }
}

Test.defaultProps = {
  questions : []
}

const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.answers,
    loading : state.loading
  };
};

export default connect(mapStateToProps)(Test);