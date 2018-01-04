// import {CLIENT_ORIGIN} from '../config'
// import axios from 'axios';

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080';

export const ADD_QUESTION = 'ADD QUESTION';
export const addQuestion = (question,topic,user,date,id, comments) => {
  console.log('addquestion', question);
  return{
  type: ADD_QUESTION,
  question,
  topic,
  user,
  date,
  id,
  comments
  }
}

export const ADD_ANSWER = 'ADD ANSWER';
export const addAnswer = (id,user,comment,questionId) => {
  return{
    type:ADD_ANSWER,
    id,
    user,
    comment,
    questionId
  }
}

export const EDIT_COMMENT = 'EDIT COMMENT';
export const editComment = (comment,answerid) => {
  return{
    type: EDIT_COMMENT,
    comment,
    answerid
  }
}

export const DELETE_COMMENT = 'DELETE COMMENT';
export const deleteComment = (answerid) => {
  return{
    type: DELETE_COMMENT,
    answerid
  }
}

export const FETCH_QUESTIONS_SUCCESS = 'FETCH QUESTIONS';
export function fetchQuestionsSuccess(questions){
  return{
    type : FETCH_QUESTIONS_SUCCESS,
    questions
  }
}

export const FETCH_ANSWERS_SUCCESS = 'FETCH ANSWERS';
export function fetchAnswersSuccess(answers){
  return{
    type : FETCH_ANSWERS_SUCCESS,
    answers
  }
}

export const fetchAnswers = () => dispatch => {
  fetch(`${CLIENT_ORIGIN}/answers`).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }

    return res.json();
  })
  .then(answers => {
    answers = {answers};
    dispatch(fetchAnswersSuccess(answers));
  })
}

export const fetchQuestions = () => dispatch => {

  fetch(`${CLIENT_ORIGIN}`).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    // console.log('res123', res.json());
    return res.json();
    })
    .then(questions => {
      questions = {questions};
      console.log('res123', questions);
      dispatch(fetchQuestionsSuccess(questions));
    })
}
