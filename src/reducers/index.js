import * as actions from '../actions';

const initialState = {
  questions : [],
  answers : [],
  loading : false
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
                comments: [...q.comments, action.id],
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
      return {...state, questions : action.questions, loading : false}

    }else if (action.type === actions.FETCH_ANSWERS_SUCCESS){
      return {...state, answers : action.answers}

    }else if (action.type === 'FETCH_QUESTION'){
      return {...state, loading: true}

    }else if (action.type === 'FETCH_ADD_ANSWERS'){
      return {...state, loading: false}

    }else if (action.type === actions.FETCH_ADD_QUESTIONS_SUCCESS){
      return Object.assign({}, state, {
        questions: [...state.questions, {
          question: action.question.question,
          topic: action.question.topic,
          user: action.question.user,
          date: action.question.date,
          _id: action.question.id,
          comments: action.question.comments
        }]
      })

    }else if (action.type === actions.FETCH_ADD_ANSWERS_SUCCESS){
      console.log('res123',action.answer.comment);
      return {
        ...state,
        questions: state.questions.map(
          q => 
            q._id === action.id
              ? {
                  ...q,
                  comments: [...q.comments, {_id : action.answer._id, user : action.answer.user, comment : action.answer.comment}],
                }
              : q,
        ),
        answers: [...state.answers, {
          _id: action.answer._id,
          user: action.answer.user,
          comment: action.answer.comment
        }]
      }
    }
  return state
  }