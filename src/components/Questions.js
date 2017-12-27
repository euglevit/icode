import React,{Component} from 'react';
import Topics from './Topics';
import Answers from './Answers';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class Questions extends Component {

  createList() {
    let thisTopic = this.props.match.params.topic.toLowerCase();

    
    return this.props.questions.map((question) => {
      console.log('question type', question, question.topic)
      if(thisTopic === question.topic){
        return(
           <li className='list-group-item' key={question.id}><Link to={{pathname: `/answers/${question.id}`}}>{question.question}</Link><p><span className="badge">{question.comments.length} comments</span>{question.date.toLocaleDateString()}</p></li>

        )
      }
    })
  }
    render() {
    return(
      <div>
        <h1>{this.props.match.params.topic}</h1>
        <h2><ul className='list-group'>{this.createList()}</ul></h2>
        <Route path='/answers/:question' component={Answers}></Route>
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

export default connect(mapStateToProps)(Questions);