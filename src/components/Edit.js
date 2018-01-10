import React,{Component} from 'react';
import {Button,Collapse} from 'react-bootstrap';
import EditText from './EditText';
import {editComment,deleteComment,fetchDeleteAnswers,fetchUpdateAnswers} from '../actions/index';
import {connect} from 'react-redux';

class Edit extends Component{
  constructor(...args) {
    super(...args);

    this.state = {textAreaValue : ''};
    this.textArea;
  }
  
  editComment(comment,answerid,questionid){
    // this.props.dispatch(editComment(comment,answerid));
    console.log(comment);
    this.props.dispatch(fetchUpdateAnswers({"comment" : comment, "id" : answerid},questionid))
  };
  deleteComment(answerid,questionid){
    // this.props.dispatch(fetchDeleteAnswers())
    this.props.dispatch(fetchDeleteAnswers({"id" : answerid},questionid));
  };


  render(){
    console.log('res123',this);
      return(
        <div className='edit-functions'>
          <Button onClick={() => this.setState({ open: !this.state.open })}
          type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </Button>
          <Button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            this.deleteComment(this.props.keys,this.props.id);
          }}
          type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </Button>
          <div>
            <Collapse in={this.state.open}>
              <div>
                <textarea ref={ref => this.textArea = ref} defaultValue={this.props.comment} onChange={e => this.setState({textAreaValue : e.target.value})} id='question-ask'></textarea>
                <button className='cancel-edit'>Cancel</button>
                <button className='submit-edit' onClick={(event) => {
                  // let commentArea = document.getElementById(`question-ask[keys=${textArea}]`);   
                  // console.log(document.getElementById(`question-ask[keys=${this.props.keys}]`))               
                  // event.preventDefault();
                  // event.stopPropagation();
                  // console.log(this,commentArea);
                  this.editComment(this.state.textAreaValue, this.props.keys, this.props.id);
                }}>Submit</button>
              </div>
            </Collapse>
          </div>
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
