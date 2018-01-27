import React,{Component} from 'react';
import {connect} from 'react-redux';
import './UserTag.css';

class UserTag extends Component{

  render(){
    return(
      <div className='user-tag-wrapper'>
        <div className='user-tag'>
          <span><p>{this.props.user}</p></span>
        </div>
        <img alt='user-pic' className='user-picture' src='https://openclipart.org/download/247324/abstract-user-flat-1.svg' height='42' width='42'/>
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