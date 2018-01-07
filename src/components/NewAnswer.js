import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addAnswer, fetchAddAnswers, fetchAnswers} from '../actions/index';
import {Form, FormControl, Button, Collapse} from 'react-bootstrap';
import './NewAnswer.css';

class NewAnswer extends Component{
  constructor(...args) {
    super(...args);

    this.state = {loading: true};
  }

  addAnswer(id1,user1,comment1,questionId1){
    this.props.dispatch(fetchAddAnswers({"comment" : comment1,"user" : user1},questionId1));
    // this.props.dispatch(fetchAnswers());
    // this.props.dispatch(addAnswer(id1,user1,comment1,questionId1));
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
                this.addAnswer((Math.floor((Math.random()*100000)+1)).toString(),'test5',answerArea,this.props.questionId);
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
    answers: state.answers,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(NewAnswer);