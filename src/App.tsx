import React, { Fragment, useState, useEffect } from 'react';
import {
  JsonForms
} from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
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
    marginBottom: '1rem',
  },
  resetButton: {
    margin: ' auto',
    display: 'block',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = ({ classes }: WithStyles<typeof styles>) => {
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setJsonformsData(jsonformsData);
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);

  const resetData = () => {
    setJsonformsData(initialData);
  }

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
          <Button className={classes.resetButton} onClick={resetData} color="primary" variant="contained">Reset data</Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Rendered form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={jsonformsData}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setJsonformsData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(App);
