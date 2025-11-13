import { useMemo, useState } from 'react';

import { JsonSchema7, rankWith, schemaMatches, Tester } from '@jsonforms/core';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useQueryState } from '../queryState';
import { Dropdown } from './Dropdown';
import { SchemaInput } from './SchemaInput';

const classes = {
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
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

export interface DynamicDropdownCustomControl {
  type: 'dynamic-dropdown';
  data: {
    sourceConnection: string;
  };
}

export interface ShadedTopoJsonCustomControl {
  type: 'shaded-topojson';
  topojson: {
    sourceConnection: string;
  };
  data: {
    sourceConnection: string;
  };
}

export interface InlineDropdownCustomControl {
  type: 'inline-dropdown';
  data: {
    // source field coming on the data to take the values from
    sourceField: string;
  };
}

interface CustomControlSchema extends JsonSchema7 {
  'forms.nby.one/custom-control':
    | ShadedTopoJsonCustomControl
    | DynamicDropdownCustomControl
    | InlineDropdownCustomControl;
}

function isNbyCustomControl(schema: object): schema is CustomControlSchema {
  return Object.hasOwn(schema, 'forms.nby.one/custom-control');
}

const isTopoJsonControl: Tester = schemaMatches(schema => {
  return (
    isNbyCustomControl(schema) &&
    schema['forms.nby.one/custom-control'].type === 'shaded-topojson'
  );
});

const isInlineJsonControl: Tester = schemaMatches(schema => {
  return (
    isNbyCustomControl(schema) &&
    schema['forms.nby.one/custom-control'].type === 'inline-dropdown'
  );
});

const renderers = [
  ...materialRenderers,
  {
    tester: rankWith(3, schemaMatches(isNbyCustomControl)),
    renderer: Dropdown,
  },
  {
    tester: rankWith(4, isTopoJsonControl),
    renderer: Dropdown,
  },

  {
    tester: rankWith(5, isInlineJsonControl),
    renderer: Dropdown,
  },
];

const initialData = {};

export function JsonFormsDemo() {
  const [dataJson, setDataJson] = useQueryState('data');

  const dataObject = useMemo(() => {
    try {
      return JSON.parse(dataJson);
    } catch {
      return {};
    }
  }, [dataJson]);

  //const [data, setData] = useState<object>(initialData);
  //const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const [schema, setSchema] = useQueryState('schema');
  const [uiSchema, setUiSchema] = useQueryState('uiSchema');

  const schemaObject = useMemo(() => {
    try {
      return JSON.parse(schema);
    } catch {
      return {};
    }
  }, [schema]);

  const uiSchemaObject = useMemo(() => {
    try {
      return JSON.parse(uiSchema);
    } catch {
      return {};
    }
  }, [uiSchema]);

  const clearData = () => {
    setDataJson('{}');
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <SchemaInput title="data.json" value={dataJson} onChange={setDataJson} />
      <SchemaInput
        title="values.schema.json"
        value={schema}
        onChange={setSchema}
      />
      <SchemaInput
        title="uiSchema.json"
        value={uiSchema}
        onChange={setUiSchema}
      />
      <Grid item sm={6}>
        <Typography variant={'h4'}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{dataJson}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Clear data
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Rendered form</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={schemaObject}
            uischema={uiSchemaObject}
            data={dataObject}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => {
              console.log('form data', data);
              //setDataJson(JSON.stringify(data))
            }}
            config={{ rootData: dataObject }}
          />
        </div>
      </Grid>
    </Grid>
  );
}
