import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {newQuestionsReducer} from './reducers';
import protectedDataReducer from './reducers/protected-data';
import authReducer from './reducers/auth';
import {createLogger} from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';


export default createStore(combineReducers({form : formReducer, auth : authReducer, protectedData : protectedDataReducer, newQuestionsReducer}),undefined,compose(applyMiddleware(createLogger(),thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
