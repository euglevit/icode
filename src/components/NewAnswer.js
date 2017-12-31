import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addAnswer} from '../actions/index';
import {Form, FormControl, Button, Collapse} from 'react-bootstrap';
import './NewAnswer.css';

class NewAnswer extends Component{
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  addAnswer(id,user,comment,questionId){
    this.props.dispatch(addAnswer(id,user,comment,questionId));
  }

  render(){
    console.log('Answer',this.props.questionId);
    return(
      <div>
        <Button onClick={() => this.setState({ open: !this.state.open })}>
        click
        </Button>
        <Collapse in={this.state.open}>
            <Form>
              <textarea id='newAnswer' placeholder='Enter Comment'></textarea>
              <Button type='submit'
              onClick= {(event) => {
                event.preventDefault();
                event.stopPropagation();
                let answerArea = document.getElementById('newAnswer').value;
                this.addAnswer((Math.floor((Math.random()*100000)+1)).toString(),'user2',answerArea,this.props.questionId);
              }}
              className='submitAnswer'>
              Submit
              </Button>
            </Form>
        </Collapse>
        
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

export default connect(mapStateToProps)(NewAnswer);