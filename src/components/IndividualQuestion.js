import React,{Component} from 'react';
import UserTag from './UserTag';


class IndividualQuestion extends Component{

  _onClick = (e) => {
    this.props.history.push(`/answers/${this.props.id}`)
  }
  render(){
    return(
      <div className='total-questions-wrapper'>
        <div className='all-question-question'>
          <p onClick={this._onClick}>{this.props.question}</p>
        </div>
        <div className='all-question-user'>
            <UserTag
              user={this.props.user}
              date={this.props.date}
              time={this.props.time}
            />
        </div>
        <div className='all-question-comment-count'>
          <p>{this.props.comments.length} comments</p>
        </div>
      </div>
    )
  }
}

export default IndividualQuestion