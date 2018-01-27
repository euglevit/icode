import React,{Component} from 'react';
import UserTag from './UserTag';
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

  editComment(comment,answerid,questionid){
    this.props.dispatch(fetchUpdateAnswers({"comment" : comment, "id" : answerid},questionid))
  };

  deleteComment(answerid,questionid){
    // this.props.dispatch(fetchDeleteAnswers())
    this.props.dispatch(fetchDeleteAnswers({"id" : answerid},questionid));
  };

  

  // componentWillUpdate(nextProps,nextState){
  //   this.state = store.getState();
  //   store.subscribe(() => {
  //     this.setState(store.getState());
  //   });
  // }

  _renderInput(){
    if(this.state.editing){
    return(
      <div className='comment-area'>
      <form id='comment-form'>
        <div className='answer-area' contentEditable='true' onChange={this._onChange} form='comment-form' autoFocus ref='textarea'>{this.props.comment}</div>
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

  _onClick = () => {
    
    this.setState({ editing: true })

  }

  _onCancel = (e) => {
    e.preventDefault()

    this.setState({editing: false});
  }

  _onSubmit = (e) => {
    e.preventDefault()

    if(this.refs.textarea.innerText == ''){
      alert('Please Enter Text.');
    }else{
      this.editComment(this.refs.textarea.innerText, this.props.id, this.props.questionId);
      this.setState({ editing: false })}
  }

  _onChange = e => this.setState({ comment: e.target.value })

  render(){
    return(
      <div className='total-question-wrapper'>
        <div className='total-question-header'>
          <p>{this.props.date}, {this.props.time}</p>
        </div>
        <div className='total-question list-group-item comment total-question-ul' id={`a${this.props.id}`}>
          <div className='usertag-class'>
            <UserTag
            user = {this.props.commentUser}
            date={this.props.date}
            time={this.props.date}
            />
          </div>
          <div className='usertag-comment'>
          {this._renderInput()}
          {this.props.user === this.props.commentUser ? <div className='edit-functions'>
          <a className='edit-link' onClick={this._onClick}> 
            <span>Edit</span>
          </a>
          <a className='delete-link' onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            this.deleteComment(this.props.id,this.props.questionId);

          }}>
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
