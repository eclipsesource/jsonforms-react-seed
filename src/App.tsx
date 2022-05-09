import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
import { makeStyles } from '@mui/styles';
import i18next from 'i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import translationEN from './localisation/en.json';
import translationDE from './localisation/de.json';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
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
  button: {
    margin: 'auto !important',
    display: 'block !important',
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

i18next.init({
  resources: {
    en: {
      translation: translationEN
    },
    de: {
      translation: translationDE
    }
  }
});


const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const [locale, setLocale] = useState<'de' | 'en'>('en');
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const createTranslator = (locale: string) => (key: any, defaultMessage: any) => {
    return i18next.exists(key) ? i18next.t(key) : defaultMessage;
  };

  const translation = useMemo(() => createTranslator(locale), [locale]);

  i18next.changeLanguage(locale);
  dayjs.locale(locale);

  const clearData = () => {
    setData({});
  };

  const switchLocale = () => {
    if (locale === 'en') {
      setLocale('de');
    } else {
      setLocale('en');
    }
  };

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
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={clearData}
              color='primary'
              variant='contained'
            >
              Clear data
            </Button>
            <Button onClick={switchLocale} color='primary' variant='contained'>
              Switch language
            </Button>
            <Typography variant={'body1'} align={'center'}>
              current language: {locale}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Rendered form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
              i18n={{ locale: locale, translate: translation }}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
