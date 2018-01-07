import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {newQuestionsReducer} from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';



export default createStore(newQuestionsReducer,undefined,compose(applyMiddleware(createLogger(),thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
