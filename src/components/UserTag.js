import React,{Component} from 'react';
import {connect} from 'react-redux';
import './UserTag.css';

class UserTag extends Component{

  render(){
    return(
      <div className='user-tag-wrapper'>
        <div className='user-tag'>
          <span><p>Asked by <span className='user-green'>{this.props.user}</span>, {this.props.date}</p></span>
        </div>
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

export default connect(mapStateToProps)(UserTag);