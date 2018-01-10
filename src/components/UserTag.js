import React,{Component} from 'react';
import {connect} from 'react-redux';
import './UserTag.css';

class UserTag extends Component{

  render(){
    return(
      <div className='user-tag-wrapper'>
        <div className='user-tag'>
          <span><p>{this.props.user}</p>
          <p>{this.props.date} {this.props.time}</p></span>
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