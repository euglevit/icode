import {createStore,applyMiddleware,compose} from 'redux';
import {newQuestionsReducer} from './reducers';
import {createLogger} from 'redux-logger';


export default createStore(newQuestionsReducer,undefined,compose(applyMiddleware(createLogger()),window.devToolsExtension ? window.devToolsExtension() : f => f));
