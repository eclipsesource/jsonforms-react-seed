import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import schema from './schema.json';
import uischema from './uischema.json';
import { Actions, jsonformsReducer, JsonFormsState } from '@jsonforms/core';
import {
  materialCells,
  materialRenderers
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { devToolsEnhancer } from 'redux-devtools-extension';
import SampleCell, { sampleCellTester } from './SampleCell';

// Setup Redux store
const data = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3
};

const initState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({
  jsonforms: jsonformsReducer()
});
const store = createStore(rootReducer, initState, devToolsEnhancer({}));
store.dispatch(Actions.init(data, schema, uischema));

// Register custom renderer for the Redux tab
store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));
store.dispatch(Actions.registerCell(sampleCellTester, SampleCell));

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
