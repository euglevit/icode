import * as actions from '../actions';

const initialState = {
  questions : [],
  answers : [],
  loading : true
}

export const newQuestionsReducer = (state = initialState, action) => {
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
      return {
        ...state,
        questions: state.questions.map(
          q => 
            q._id === action.id
              ? {
                  ...q,
                  comments: [...q.comments, {_id : action.answer._id, user : action.answer.user, comment : action.answer.comment, date: action.answer.date}],
                }
              : q,
        ),
        answers: [...state.answers, {
          _id: action.answer._id,
          user: action.answer.user,
          comment: action.answer.comment,
          date: action.answer.date
        }]
      }
    }else if (action.type === actions.FETCH_DELETE_ANSWERS_SUCCESS){
      let filteredQuestion = state.questions.map(question => {
        if(question._id === action.id){
          question.comments = question.comments.filter(item => item._id !== action.answers._id);
          return question
          }
        return question;
        });
      let filteredAnswer = state.answers.filter(item => item._id !== action.answers._id);
      return {...state, answers : filteredAnswer, questions : filteredQuestion}

    }else if (action.type === actions.FETCH_UPDATE_ANSWERS_SUCCESS){
      return {
        ...state,
        questions: state.questions.map(item => {
          if(item._id === action.id){
            return {
              ...item,
              comments: item.comments.map((comment, index) => {
              if(comment._id === action.answer._id){
                const myNewComment = {...comment, comment : action.answer.comment}
                return myNewComment
              }
              return comment
            })
          }
        }
          return item
        }),
        answers: state.answers.map((item,index) => {
          if(item._id === action.answer._id){
            item.comment = action.answer.comment;
            return item;
          }
          return {
            ...item,
            ...action.item
          }
        })
      }
    }else if (action.type === actions.FETCH_UPDATE_QUESTIONS_SUCCESS){
      return{ 
      ...state , 
      questions: state.questions.map((item,index) => {
        if(item._id === action.question._id){
          item.question = action.question.question;
          return item;
        }
        return {
          ...item,
          ...action.item
        }
      })
    }
  }
  return state
}