import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import combineReducer from './Redux/combineReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(combineReducer)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

