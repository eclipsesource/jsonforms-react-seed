This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
# JSON Forms React seed App
This seed demonstrates how to use [JSON Forms](https://jsonforms.io) with React in order to render a simple form for displaying a task entity. It showcases both the redux variant and the React standalone component (without redux).
 
It is based on create-react-app and only contains minor modifications.

 * Execute `npm ci` to install the prerequisites. If you want to have the latest released versions use `npm install`.
 * Execute `npm start` to start the application.
 
 Browse to http://localhost:3000 to see the application in action.

## File Structure
Let's briefly have a look at the most important files:
* `src/schema.json` contains the JSON schema (also referred to as 'data schema')
* `src/uischema.json` contains the UI schema
* `src/index.js` is the entry point of the application and sets up the redux store that contains the data, the JSON and the UI schema necessary for JSON Forms.
* `src/App.js` is the main React component and makes use of the core JSON Forms component or the React standalone component in order to render a form.
  
The [data schema](https://github.com/eclipsesource/jsonforms-react-seed/blob/master/src/schema.json) defines the structure of a Task: it contains attributes such as title, description, due date and so on.

The [corresponding UI schema](https://github.com/eclipsesource/jsonforms-react-seed/blob/master/src/uischema.json) specifies controls for each property and puts them into a vertical layout that in turn contains two horizontal layouts.

Both the data schema and the UI schema are imported within `index.js` and are used to set up a redux store. We make use of a helper function exported by JSON Forms which expects the initial state. If you already have an existing redux store, you'll need to import the jsonforms reducer and add it to your store. Please refer to [the tutorial](https://jsonforms.io/docs/tutorial) for how to do this.

## Setting up the store

```js
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
      cells: JsonForms.cells
    },
  },
  applyMiddleware(thunk)
);

// initialize store
store.dispatch({
  type: Actions.INIT,
  data,
  schema,
  uischema,
});

// trigger initial validation
store.dispatch(Actions.validate());
```

We then use the `Provider` component provided by `react-redux` to provide the store to the JSON Forms redux component and all its children.

```js
<Provider store={store}>
  <JsonFormsReduxContext>
    <JsonFormsDispatch />
  </JsonFormsReduxContext>
</Provider>
```

## Rendering our form
The `App` component is responsible for rendering our actual forms.

The redux form is rendered by importing and using `DispatchRenderer` from `@jsonforms/core`. `DispatchRenderer` expects `schema` and `uischema` props which define the form to be rendered but if those are omitted, they will be pulled from the store which was provided via `Provider` previously.

The standalone form is rendered by importing and using the `JsonForms` component and directly handing over the `schema`, `uischema`, `data`, `renderer` and `cell` props. We listen to changes in the form via the `onChange` callback .

## Custom renderers
Please see [our corresponding tutorial](https://jsonforms.io/docs/tutorial) on how to add custom renderers.
