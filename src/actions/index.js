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
