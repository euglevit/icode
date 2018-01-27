import React,{Component} from 'react';
import store from '../store';
import UserTag from './UserTag';


class IndividualQuestion extends Component{
  constructor(props){
    super(props)

    this.state = store.getState();
  }

  render(){
    return(
      <div className='total-questions-wrapper' onClick={(event) => {
        this.props.history.push(`/answers/${this.props.id}`)
        }}>

        <div className='all-question-user'>
            <UserTag
              user={this.props.user}
              date={this.props.date}
              time={this.props.time}
            />
        </div>
        <div className='all-question-question'>
          <p>{this.props.question}</p>
        </div>
        <div className='all-question-last-post'>
          <p>{ this.props.comments.length >= 1 ? this.props.comments[0].user : 'none'}</p>
        </div>
        <div className='all-question-comment-count'>
          <p>{this.props.comments.length}</p>
        </div>
      </div>
    )
  }
}

export default IndividualQuestion