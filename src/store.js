import {createStore} from 'redux';
import {newQuestionsReducer} from './reducers';

export default createStore(newQuestionsReducer);