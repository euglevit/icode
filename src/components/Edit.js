import React,{Component} from 'react';
import {Button,Collapse} from 'react-bootstrap';
import {editComment,deleteComment,fetchDeleteAnswers,fetchUpdateAnswers} from '../actions/index';
import {connect} from 'react-redux';

class Edit extends Component{
  constructor(...args) {
    super(...args);

    this.state = {textAreaValue : ''};
    this.textArea;
  }
  
  //Edits the comment
  editComment(comment,answerid,questionid){
    this.props.dispatch(fetchUpdateAnswers({"comment" : comment, "id" : answerid},questionid))
  };

  //Deletes the comment
  deleteComment(answerid,questionid){
    this.props.dispatch(fetchDeleteAnswers({"id" : answerid},questionid));
  };


  render(){
      return(
        <div className='edit-functions'>
        <div>
            <Collapse in={this.state.open}>
              <div>
                <textarea ref={ref => this.textArea = ref} defaultValue={this.props.comment} onChange={e => this.setState({textAreaValue : e.target.value})} id='question-ask'></textarea>
                <button className='cancel-edit'>Cancel</button>
                <button className='submit-edit' onClick={(event) => {
                  this.editComment(this.state.textAreaValue, this.props.keys, this.props.id);
                }}>Submit</button>
              </div>
            </Collapse>
          </div>
          <button onClick={(event) => this.setState({ open: !this.state.open })}
          type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </button>
          <button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            document.find
            this.deleteComment(this.props.keys,this.props.id);

          }}
          type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
          
        </div>
      )
    }
  
}

const mapStateToProps = state => {
  return{
    questions: state.newQuestionsReducer.questions,
    answers: state.newQuestionsReducer.answers
    // user: state.auth.currentUser.username
  };
};

export default connect(mapStateToProps)(Edit);
