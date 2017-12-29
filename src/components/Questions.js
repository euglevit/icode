import React,{Component} from 'react';
import Topics from './Topics';
import Answers from './Answers';
import UserTag from './UserTag';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './Questions.css';


class Questions extends Component {

  createList() {
    let thisTopic = this.props.match.params.topic.toLowerCase();

    
    return this.props.questions.map((question) => {
      if(thisTopic === question.topic){
        return(
          <div onClick={(event) => {
            this.props.history.push(`/answers/${question.id}`)
            }} 
            className='total-question'>
            <li className='list-group-item' key={question.id}><span className='asked-question'><p>{question.question}</p></span><span className="badge">{question.comments.length} comments</span><UserTag 
            user={question.user}
            date={question.date.toLocaleDateString()}
            time={question.date.toLocaleTimeString()}
            /></li>
          </div>

        )
      }
    })
  }

  choosePicture() {
    let pic =
      {
        Javascript:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJXtjZwB6zdB4WoHDMyBDvX-4Xk3zbU_Z7tGKH-jyWPCXwWHv1xw',
        jQuery: 'https://avatars0.githubusercontent.com/u/70142?s=200&v=4',
        Node: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzZDbbYL2rzTcPlRaNXe7eWxZ1pray0VDpxZKwsztrVGumPnjnA',
        React: 'https://cdn-images-1.medium.com/max/1600/1*qUlxDdY3T-rDtJ4LhLGkEg.png',
        Ajax: 'https://static.hltv.org/images/team/logo/7558',
        Git: 'https://avatars1.githubusercontent.com/u/18133?s=400&v=4'
      }
      console.log('yes',pic.Javascript);
      if(this.props.match.params.topic === 'Javascript'){
        return pic.Javascript;
      }else if(this.props.match.params.topic === 'jQuery'){
        return pic.jQuery;
      }else if(this.props.match.params.topic === 'Node'){
        return pic.Node;
      }else if(this.props.match.params.topic === 'React'){
        return pic.React;
      }else if(this.props.match.params.topic === 'Ajax'){
        return pic.Ajax;
      }else if(this.props.match.params.topic === 'Git'){
        return pic.Git;
      }
    }
    
  
    render() {
    return(
      <div>
        <div className='topic-header-wrapper'>
          <div className='topic-header'>
            <h1>{this.props.match.params.topic}</h1>
            <img src={this.choosePicture()} height='100' width='120'></img>
            <button className='navbar-button'><Link to={{pathname: '/new'}}>New Question</Link></button>
          </div>
        </div>
        <h2><ul className='list-group total-question-ul'>{this.createList()}</ul></h2>
        <Route path='/answers/:question' component={Answers}></Route>
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

export default connect(mapStateToProps)(Questions);