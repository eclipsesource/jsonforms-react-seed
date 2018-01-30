import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import schema from './schema.json';
import uischema from './uischema.json';
import { Actions, JsonForms, jsonformsReducer } from '@jsonforms/core';
import '@jsonforms/material-renderers';
import RatingControl, {ratingControlTester} from './RatingControl';

const data = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const store = createStore(
  jsonformsReducer(),
  {
    jsonforms: {
      common: {
        data,
        schema,
        uischema
      },
      renderers: JsonForms.renderers,
      fields: JsonForms.fields
    },
  },
  applyMiddleware(thunk)
);

store.dispatch({
  type: Actions.INIT,
  data,
  schema,
  uischema,
});

store.dispatch(Actions.validate());

// Uncomment this line (and respective import) to register our custom renderer
store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
