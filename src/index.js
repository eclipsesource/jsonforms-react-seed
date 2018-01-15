import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { initJsonFormsStore, registerRenderer } from '@jsonforms/core';
import schema from './schema.json';
import uischema from './uischema.json';
import '@jsonforms/material-renderers';
//import RatingControl, {ratingControlTester} from './rating.control';

const data = {
  'name': 'Send email to Adrian',
  'description': 'Confirm if you have passed the subject\nHerby ...',
  'done': true,
  'recurrence': 'Daily',
  'rating': 3,
};

const store = initJsonFormsStore(data, schema, uischema);

// Uncomment this line (and respective import) to register our custom renderer
//store.dispatch(registerRenderer(ratingControlTester, RatingControl));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
