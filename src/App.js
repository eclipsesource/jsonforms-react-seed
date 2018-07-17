import { connect } from 'react-redux';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { getData } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import logo from './logo.svg';
import './App.css';

const styles = {
  container: {
    padding: '2em'
  },
  title: {
    textAlign: 'center',
    padding: '0.25em'
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece'
  },
  demoform: {
    margin: 'auto'
  }
};


const App = ({ classes, dataAsString }) => (
  <div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to JSON Forms with React</h1>
        <p className="App-intro">More Forms. Less Code.</p>
      </header>
    </div>

    <Grid container justify={'center'} spacing={24} className={classes.container}>
      <Grid item sm={3}>
        <Typography
          variant={'display1'}
          className={classes.title}
        >
          Bound data
        </Typography>
        <div className={classes.dataContent}>
          <pre>{dataAsString}</pre>
        </div>
      </Grid>
      <Grid item sm={6}>
        <Typography
          variant={'display1'}
          className={classes.title}
        >
          Rendered form
        </Typography>
        <div className={classes.demoform}>
          <JsonForms />
        </div>
      </Grid>
    </Grid>
  </div>
);

const mapStateToProps = state => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) }
};

export default connect(mapStateToProps, null)(withStyles(styles)(App));

