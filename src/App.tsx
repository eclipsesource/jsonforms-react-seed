import { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
import { makeStyles } from '@material-ui/core/styles';
import TierControlTester from './TierControlTester';
import TierControl from './TierControl';
import TierCell from './TierCell';

const useStyles = makeStyles((_theme) => ({
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
  resetButton: {
    margin: 'auto',
    display: 'block',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
}));

//const initialData = {
//  name: 'Send email to Adrian',
//  description: 'Confirm if you have passed the subject\nHereby ...',
//  done: true,
//  recurrence: 'Daily',
//  rating: 3,
//};

//const initialData = data;

const initialData = {
  net_d: 30,
  payment_method: 'Bank Transfer',
  prepay_amount: 2000,
  recharge_credit: 0,
  origin_shield: [
    {
      name: 'Origin Shield',
      free_tier: 0,
      sample_usage: 1,
      price: 200,
      sample_amount: 200
    }
  ],
  synthetic_monitoring: [
    {
      name: 'Synthetic Monitoring Checks',
      free_tier: 100000,
      sample_usage: 25000,
      price: 0.50
    }
  ],
  routing_policy: [
    {
      name: 'Static Routing Rules',
      free_tier: 100,
      sample_usage: 200
    },
    {
      name: 'Dynamic Routing Rules',
      free_tier: 100,
      sample_usage: 50
    }
  ],
  mcdn_orchestrations: [
    {
      name: 'No of CDN Integrations',
      free_tier: 25,
      sample_usage: 30,
      price: 10,
      sample_amount: 50
    }
  ],
  mdns: [
    {
      name: 'DNS Records',
      free_tier: 100,
      sample_usage: 200,
      unit_price: 0.4,
  },
  {
    name: 'Global DNS Queries',
    free_tier: 1000000,
    sample_usage: 476200,
    unit_price: 0.8,
  },
  {
    name: 'China DNS Subscription',
  },
  {
    name: 'China DNS Queries',
    sample_usage: 6000000,
    unit_price: 1.2,
  }],
  basic_cdns: [
    {
      name: 'AWS Cloudfront',
      free_tier: 0,
      sample_usage: 200,
      tiers: [
        { tier: '1 - x', price: 0.18 }, { tier: 'x - 10TB', price: 0.18 }, 
        { tier: '11 - 100TB', price: 0.15 }, { tier: '101 - 1PB', price: 0.11 },
        { tier: '>1PB', price: 0.09 }
      ],
      unit_price: 0.18,
    },
    {
      name: 'StackPath',
      free_tier: 0,
      sample_usage: 300,
      tiers: [
        { tier: '1 - x', price: 0.18 }, { tier: 'x - 10TB', price: 0.18 }, 
        { tier: '11 - 100TB', price: 0.15 }, { tier: '101 - 1PB', price: 0.11 },
        { tier: '>1PB', price: 0.09 }
      ],
      unit_price: 0.18,
    },
    {
      name: 'Cloudflare',
      free_tier: 0,
      sample_usage: 200,
      tiers: [
        { tier: '1 - x', price: 0.18 }, { tier: 'x - 10TB', price: 0.18 }, 
        { tier: '11 - 100TB', price: 0.15 }, { tier: '101 - 1PB', price: 0.11 },
        { tier: '>1PB', price: 0.09 }
      ],
      unit_price: 0.18,
    },
    {
      name: 'GMA',
      free_tier: 0,
      sample_usage: 0,
      tiers: [
        { tier: '1 - x', price: 0.18 }, { tier: 'x - 10TB', price: 0.18 }, 
        { tier: '11 - 100TB', price: 0.15 }, { tier: '101 - 1PB', price: 0.11 },
        { tier: '>1PB', price: 0.09 }
      ],
      unit_price: 0.18,
    }
  ],
  global_cdns: [
    {
      name: 'Aliyun',
      tiers: [
        { tier: '1 - x', price: 0.18 }, { tier: 'x - 10TB', price: 0.18 }, 
        { tier: '11 - 100TB', price: 0.15 }, { tier: '101 - 1PB', price: 0.11 },
        { tier: '>1PB', price: 0.07 }
      ],
    },
    {
      name: 'Aliyun China DCDN',
      tiers: [
        { tier: '1 - x', price: 1.20 }, { tier: 'x - 10TB', price: 1.20 }, 
        { tier: '11 - 100TB', price: 1.10 }, { tier: '101 - 1PB', price: 0.85 },
        { tier: '>1PB', price: 0.76 }
      ],
    },
    {
      name: 'CDNetworks',
      tiers: [
        { tier: '1 - x', price: 0.30 }, { tier: 'x - 10TB', price: 0.30 }, 
        { tier: '11 - 100TB', price: 0.24 }, { tier: '101 - 1PB', price: 0.14 },
        { tier: '>1PB', price: 0.11 }
      ],
    },
    {
      name: 'Verizon'
    },
    {
      name: 'Fastly',
      tiers: [
        { tier: '1 - x', price: 0.30 }, { tier: 'x - 10TB', price: 0.30 }, 
        { tier: '11 - 100TB', price: 0.24 }, { tier: '101 - 1PB', price: 0.14 },
        { tier: '>1PB', price: 0.11 }
      ],
    },
    {
      name: 'Akamai',
      tiers: [
        { tier: '1 - x', price: 0.32 }, { tier: 'x - 10TB', price: 0.32 }, 
        { tier: '11 - 100TB', price: 0.27 }, { tier: '101 - 1PB', price: 0.18 },
        { tier: '>1PB', price: 0.15 }
      ],
    }
  ]
}


const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: TierControlTester, renderer: TierControl},
];

const cells = [
  ...materialCells,
  { tester: TierControlTester, cell: TierCell },
];

const App = () => {
  const classes = useStyles();
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);

  const clearData = () => {
    setJsonformsData({});
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
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
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

export default App;
