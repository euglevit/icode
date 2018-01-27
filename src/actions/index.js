
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080';

export const ADD_QUESTION = 'ADD QUESTION';
export const addQuestion = (question,topic,user,date,id, comments) => {
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

export const FETCH_QUESTIONS_SUCCESS = 'FETCH QUESTIONS SUCCESS';
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

export const FETCH_ADD_QUESTIONS_SUCCESS = 'FETCH ADD QUESTIONS SUCCESS';
export const fetchAddQuestionsSuccess = (question) => {
  return{
    type : FETCH_ADD_QUESTIONS_SUCCESS,
    question
  }
}

export const FETCH_ADD_ANSWERS_SUCCESS = 'FETCH ADD ANSWERS SUCCESS';
export const fetchAddAnswersSuccess = (answer,id,date) => {
  return{
    type : FETCH_ADD_ANSWERS_SUCCESS,
    answer,
    id
  }
}

export const FETCH_DELETE_ANSWERS_SUCCESS = 'FETCH DELETE ANSWERS SUCCESS';
export const fetchDeleteAnswersSuccess = (answers,id) => {
  return{
    type : FETCH_DELETE_ANSWERS_SUCCESS,
    answers,
    id
  }
}

export const FETCH_UPDATE_ANSWERS_SUCCESS = 'FETCH UPDATE ANSWERS SUCCESS';
export const fetchUpdateAnswersSuccess = (answer,id,date) => {
  return{
    type : FETCH_UPDATE_ANSWERS_SUCCESS,
    answer,
    id
  }
}

export const FETCH_UPDATE_QUESTIONS_SUCCESS = 'FETCH UPDATE QUESTION SUCCESS';
export const fetchUpdateQuestionSuccess = (question,id,date) => {
  return{
    type : FETCH_UPDATE_QUESTIONS_SUCCESS,
    question,
    id
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
    dispatch(fetchAnswersSuccess(answers));
  })
}

export const fetchQuestions = () => dispatch => {
  dispatch({type:'FETCH_QUESTION'})
  fetch(`${CLIENT_ORIGIN}`).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
    })
    .then(questions => {
      dispatch(fetchQuestionsSuccess(questions));
    })
}

export const fetchAddQuestions = (pass) => (dispatch,getState) => {
  pass = JSON.stringify(pass);
  const authToken = getState().auth.authToken;
  fetch(`${CLIENT_ORIGIN}/new`, {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*',
      Authorization: `Bearer ${authToken}`
    },
    body: pass
  }).then(res => {
    if(!res.ok) {
      if (
      res.headers.has('content-type') &&
      res.headers
          .get('content-type')
          .startsWith('application/json')
      ){
        return res.json().then(err => Promise.reject(err));
      }
      return Promise.reject(res.statusText);
    }
    return res.json();     
  })
  .then(question => {
    dispatch(fetchAddQuestionsSuccess(question));
  })
}

export const fetchAddAnswers = (pass,id) => (dispatch,getState) => {
  dispatch({type:'FETCH_ADD_ANSWERS'});
  pass = JSON.stringify(pass);
  const authToken = getState().auth.authToken;
  fetch(`${CLIENT_ORIGIN}/answers/${id}`, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Access-Control-Origin' : '*',
      Authorization : `Bearer ${authToken}`
    },
    body : pass
  }).then(res => {
    if(!res.ok) {
      if (
        res.headers.has('content-type') &&
        res.headers
          .get('content-type')
          .startsWith('application/json')
      ){
        return res.json().then(err => Promise.reject(err));
      }
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(answer => {
    dispatch(fetchAddAnswersSuccess(answer,id,answer.date));
  })
}

export const fetchDeleteAnswers = (pass,id) => dispatch => {
  pass = JSON.stringify(pass);
  fetch(`${CLIENT_ORIGIN}/answers/${id}`, {
    method: 'DELETE',
    headers : {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    },
    body : pass
  }).then(res => {
    return res.json();
  })
  .then(answer => {
    dispatch(fetchDeleteAnswersSuccess(answer,id));
  })
  .catch((error) => {
    console.log(error);
  })
}

export const fetchUpdateAnswers = (pass,id) => (dispatch,getState) => {
  dispatch({type:'FETCH_UPDATE_ANSWERS'});
  pass = JSON.stringify(pass);
  const authToken = getState().auth.authToken;
  fetch(`${CLIENT_ORIGIN}/answers/${id}/a`, {
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      Authorization : `Bearer ${authToken}`
    },
    body : pass
  }).then(res => {
    return res.json();
  })
  .then(answer => {
    dispatch(fetchUpdateAnswersSuccess(answer,id));
  })
  .catch((error) => {
    console.log(error);
  })
}

export const fetchUpdateQuestion = (pass,id) => (dispatch,getState) => {
  dispatch({type: 'FETCH_UPDATE_QUESTION'});
  pass = JSON.stringify(pass);
  const authToken = getState().auth.authToken;
  fetch(`${CLIENT_ORIGIN}/answers/${id}/q`, {
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      Authorization : `Bearer ${authToken}`
    },
    body : pass
  }).then(res => {
    return res.json();
  })
  .then(question => {
    dispatch(fetchUpdateQuestionSuccess(question,id))
  })
  .catch((error) => {
    console.log(error)
  })
}
