import * as actions from '../actions';

const initialState = {
  questions: [{
      topic: 'javascript',
      id: '1234567',
      user: 'test1',
      question: 'What is javascript',
      date: new Date(),
      comments: [{
          answerid: '123'
        },
        {
          answerid: '234'
        }
      ]
    },
    {
      topic: 'jquery',
      id: '3456789',
      user: 'test5',
      question: 'What is jquery',
      date: new Date(),
      comments: [{
          answerid: '123'
        },
        {
          answerid: '567'
        },
        {
          answerid: '234'
        }
      ]
    },
    {
      topic: 'javascript',
      id: '2345678',
      user: 'test2',
      question: 'What is a for loop',
      date: new Date(),
      comments: [{
          answerid: '567'
        },
        {
          answerid: '678'
        }
      ]
    }
  ],
  answers: [{
      id: '123',
      user: 'test3',
      comment: 'javascript is a programming language'
    },
    {
      id: '234',
      user: 'test4',
      comment: 'I dont know what javascript is.'
    },
    {
      id: '567',
      user: 'test3',
      comment: 'I dont know what a for loop is.'
    },
    {
      id: '678',
      user: 'test4',
      comment: 'It is a loop.'
    }
  ]
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
    console.log('using second reducer');

    let questionIndex = state.questions.map((question) => {
      if (question.id === action.questionId[0]) {
        return state.questions.indexOf(question);
      }
    })
    questionIndex = questionIndex.filter(quest => {
      return typeof quest === 'number';
    })
    questionIndex = parseInt(questionIndex);

    let selectedQuestion = state.questions.map((question) => {
      if (question.id === action.questionId[0]) {
        question.comments.push([{
          answerId: action.id
        }])
        console.log('selected', question)
      }
    })
    console.log('state', state);
    return (
      Object.assign({}, state, {
        answers: [...state.answers, {
          id: action.id,
          user: action.user,
          comment: action.comment
        }]
      }))
  }

  return (
    console.log('new state', state),
    state
  );
}