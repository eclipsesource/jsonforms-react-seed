import React, { Fragment, useState, useEffect } from 'react';
import {
  JsonForms,
  JsonFormsDispatch,
  JsonFormsReduxContext,
} from '@jsonforms/react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Tabs, Tab } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { Store } from 'redux';
import { get } from 'lodash';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';

const styles = createStyles({
  container: {
    padding: '1em',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

export interface AppProps extends WithStyles<typeof styles> {
  store: Store;
}

const data = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const getDataAsStringFromStore = (store: Store) =>
  store
    ? JSON.stringify(
        get(store.getState(), ['jsonforms', 'core', 'data']),
        null,
        2
      )
    : '';

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = ({ store, classes }: AppProps) => {
  const [tabIdx, setTabIdx] = useState(0);
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsInputData, setJsonformsInputData] = useState<any>(data);
  const [jsonformsOutputData, setJsonformsOutputData] = useState<any>(data);

  useEffect(() => {
    if (tabIdx === 0) {
      setJsonformsInputData(jsonformsOutputData);
      setDisplayDataAsString(JSON.stringify(jsonformsOutputData, null, 2));
    } else {
      setDisplayDataAsString(getDataAsStringFromStore(store));
    }
  }, [tabIdx, store, jsonformsOutputData]);

  useEffect(() => {
    const updateStringData = () => {
      const stringData = getDataAsStringFromStore(store);
      setDisplayDataAsString(stringData);
    };
    store.subscribe(updateStringData);
    updateStringData();
  }, [store]);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsOutputData, null, 2));
  }, [jsonformsOutputData]);

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to JSON Forms with React</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{displayDataAsString}</pre>
          </div>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Rendered form
          </Typography>
          <Tabs value={tabIdx} onChange={(event, value) => setTabIdx(value)}>
            <Tab label='Standalone' />
            <Tab label='via Redux (legacy)' />
          </Tabs>
          {tabIdx === 0 && (
            <div className={classes.demoform}>
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={jsonformsInputData}
                renderers={renderers}
                cells={materialCells}
                onChange={({ errors, data }) => setJsonformsOutputData(data)}
              />
            </div>
          )}
          {tabIdx === 1 && (
            <div className={classes.demoform} id='form'>
              {store ? (
                <Provider store={store}>
                  <JsonFormsReduxContext>
                    <JsonFormsDispatch />
                  </JsonFormsReduxContext>
                </Provider>
              ) : null}
            </div>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(App);
