import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const initialState = {};

const store = createStore(rootReducer, initialState);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);