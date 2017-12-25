export const ADD_QUESTION = 'ADD QUESTION';
export const addQuestion = (question,topic,user,date) => {
  console.log('addquestion', question);
  return{
  type: ADD_QUESTION,
  question,
  topic,
  user,
  date
  }
}