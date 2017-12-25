import React,{Component} from 'react';
import Topics from './Topics';
import Answers from './Answers';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class Questions extends Component {
  
  // console.log(props.match.params.topic);
  

  createList() {
    console.log(this.props.match.params.topic.toLowerCase());
    let thisTopic = this.props.match.params.topic.toLowerCase();

    
    return this.props.questions.map((question) => {
      console.log('question type', question, question.topic)
      if(thisTopic === question.topic){
        return(
           <li key={question.id}><Link to={{pathname: `/answers/${question.id}`}}>{question.question}</Link><p>{question.date}</p></li>

        )
      }
    })
  }
    render() {
    return(
      <div>
        <h1>{this.props.match.params.topic}</h1>
        <h2>{this.createList()}</h2>
        <Route path='/answers/:question' component={Answers}></Route>
      </div>
    )
}
  
}
const mapStateToProps = state => {
  return{
    questions: state.questions
  };
};

export default connect(mapStateToProps)(Questions);