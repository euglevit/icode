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
  console.log('addanswer',comment);
  return{
    type:ADD_ANSWER,
    id,
    user,
    comment,
    questionId
  }
}