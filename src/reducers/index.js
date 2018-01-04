import * as actions from '../actions';

const initialState = {
  questions : [],
  answers : []

  // questions: [{
  //     topic: 'javascript',
  //     id: '1234567',
  //     user: 'test1',
  //     question: 'What is javascript',
  //     date: new Date(),
  //     comments: [{
  //         answerid: '123'
  //       },
  //       {
  //         answerid: '234'
  //       }
  //     ]
  //   },
  //   {
  //     topic: 'jquery',
  //     id: '3456789',
  //     user: 'test5',
  //     question: 'What is jquery',
  //     date: new Date(),
  //     comments: [{
  //         answerid: '123'
  //       },
  //       {
  //         answerid: '567'
  //       },
  //       {
  //         answerid: '234'
  //       }
  //     ]
  //   },
  //   {
  //     topic: 'javascript',
  //     id: '2345678',
  //     user: 'test2',
  //     question: 'What is a for loop',
  //     date: new Date(),
  //     comments: [{
  //         answerid: '567'
  //       },
  //       {
  //         answerid: '678'
  //       }
  //     ]
  //   }
  // ],
  // answers: [{
  //     id: '123',
  //     user: 'test3',
  //     comment: 'javascript is a programming language'
  //   },
  //   {
  //     id: '234',
  //     user: 'test4',
  //     comment: 'I dont know what javascript is.'
  //   },
  //   {
  //     id: '567',
  //     user: 'test3',
  //     comment: 'I dont know what a for loop is.'
  //   },
  //   {
  //     id: '678',
  //     user: 'test4',
  //     comment: 'It is a loop.'
  //   }
  // ]
}

export const newQuestionsReducer = (state = initialState, action) => {
  console.log('using reducer', state);
  if (action.type === actions.ADD_QUESTION) {
    return Object.assign({}, state, {
      questions: [...state.questions, {
        question: action.question,
        topic: action.topic,
        user: action.user,
        date: action.date,
        id: action.id,
        comments: action.comments
      }]
    })
  } else if (action.type === actions.ADD_ANSWER) {

    return {
      ...state,
      questions: state.questions.map(
        q =>
          q.id === action.questionId
            ? {
                ...q,
                comments: [...q.comments, {answerid: action.id}],
              }
            : q,
      ),
      answers: [...state.answers, {
        id: action.id,
        user: action.user,
        comment: action.comment
      }]
    }
    // console.log('state', state);
    // return (
    //   Object.assign({}, state, {

    //   }))
  } else if (action.type === actions.EDIT_COMMENT) {
    return {
      ...state,
      answers: state.answers.map((item,index) => {
        if(item.id === action.answerid){
          item.comment = action.comment;
          return item;
        }
        return {
          ...item,
          ...action.item
        }
      })

        }
      
    }else if (action.type === actions.DELETE_COMMENT) {
      let filteredAnswer = state.answers.filter(item => item.id !== action.answerid);
      return {...state, answers : filteredAnswer}

    }else if (action.type === actions.FETCH_QUESTIONS_SUCCESS){
      return {...state}
    }else if (action.type === actions.FETCH_ANSWERS_SUCCESS){
      return
        Object.assign({}, state, {answers : action.answers})
    }
  return state
}