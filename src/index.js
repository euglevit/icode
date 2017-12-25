import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
(
  <Provider store={store}>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  </Provider>
)
, document.getElementById('root'));
registerServiceWorker();
