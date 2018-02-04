import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchDeleteAnswers,fetchUpdateAnswers} from '../actions/index';

class IndividualAnswer extends Component{
  constructor(props) {
    super(props);

    this.state={
      editing: false,
      comment: this.props.comment
    };
  }

  //Edits comments
  editComment(comment,answerid,questionid){
    this.props.dispatch(fetchUpdateAnswers({"comment" : comment, "id" : answerid},questionid))
  };

  //Deletes comments
  deleteComment(answerid,questionid){
    this.props.dispatch(fetchDeleteAnswers({"id" : answerid},questionid));
  };

  //Makes comment editable
  _renderInput(){
    if(this.state.editing){
    return(
      <div className='comment-area'>
      <form id='comment-form'>
        <div className='answer-area' contentEditable='true' suppressContentEditableWarning onChange={this._onChange} form='comment-form' autoFocus ref='textarea'>{this.props.comment}</div>
      </form>
      <div className='edit-answer-functions'>
        <a className='submit-answer-button' onClick={this._onSubmit}>Submit</a>
        <a className='cancel-answer-button' onClick={this._onCancel}>Cancel</a>
      </div>
      </div>
    )}
    return(
      <p>{this.props.comment}</p>
    )
  }

  //Sets editing to true
  _onClick = () => {
    
    this.setState({ editing: true })

  }

  //sets editing to false
  _onCancel = (e) => {
    e.preventDefault();

    this.setState({editing: false});
  }

  //Submits edit and sets editing to false.
  _onSubmit = (e) => {
    e.preventDefault();

    if(this.refs.textarea.innerText === ''){
      alert('Please Enter Text.');
    }else{
      this.editComment(this.refs.textarea.innerText, this.props.id, this.props.questionId);
      this.setState({ editing: false })}
  }

  //Deletes comment on click
  _onDelete = (e) => {
    e.preventDefault();
    this.deleteComment(this.props.id, this.props.questionId);
  }

  //Sets comment equal to the value of the textarea
  _onChange = e => this.setState({ comment: e.target.value })

  render(){
    return(
      <div className='total-question-wrapper'>
        <div className='question-header'>
          <img src="http://www.noworrynotension.com/SignIn/assets/images/user-icon-png-pnglogocom.png" alt="user" height='40px' width='40px'/>
          <div className="header-p-div">
            <p className='question-page-user'>{this.props.commentUser}</p>
            <p>Posted {this.props.date}</p>
          </div>
        </div>
        <div className='total-question list-group-item comment total-question-ul' id={`a${this.props.id}`}>
          <div className='usertag-comment'>
          {this._renderInput()}
          {this.props.user === this.props.commentUser ? <div className='edit-functions'>
          <a className='edit-link' onClick={this._onClick}> 
            <span>Edit</span>
          </a>
          <a className='delete-link' onClick={this._onDelete}>
            <span>Delete</span>
          </a></div> : ''}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers,
    loading : state.newQuestionsReducer.loading,
    loadin : state.protectedData.loadin
  };
};
export default withRouter(connect(mapStateToProps)(IndividualAnswer));
