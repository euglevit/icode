import React,{Component} from 'react';
import {Button,Collapse} from 'react-bootstrap';
import EditText from './EditText';
import {editComment,deleteComment} from '../actions/index';
import {connect} from 'react-redux';

class Edit extends Component{
  constructor(...args) {
    super(...args);

    this.state = {};
  }
  
  editComment(comment,answerid){
    console.log(comment,answerid);
    this.props.dispatch(editComment(comment,answerid));
  };
  deleteComment(answerid){
    console.log(answerid);
    this.props.dispatch(deleteComment(answerid));
  };


  render(){
    console.log(this.props);
    if(this.props.user === 'user2'){
      return(
        <div className='edit-functions'>
          <Button onClick={() => this.setState({ open: !this.state.open })}
          type="button" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </Button>
          <Button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            this.deleteComment(this.props.keys);
          }}
          type="button" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </Button>
          <div>
            <Collapse in={this.state.open}>
              <div>
                <textarea id='question-ask' placeholder={this.props.comment}></textarea>
                <button className='cancel-edit'>Cancel</button>
                <button className='submit-edit' onClick={(event) => {
                  let commentArea = document.getElementById('question-ask').value;
                  event.preventDefault();
                  event.stopPropagation();
                  console.log(this);
                  this.editComment(commentArea,this.props.keys);
                }}>Submit</button>
              </div>
            </Collapse>
          </div>
        </div>
      )
    }else{
      return(<div></div>)
    }
  }
}

const mapStateToProps = state => {
  return{
    questions: state.questions,
    answers: state.answers
  };
};

export default connect(mapStateToProps)(Edit);
