import { useEffect, useState } from 'react';

import { ControlProps, EnumOption, JsonSchema7 } from '@jsonforms/core';
import { MaterialEnumControl } from '@jsonforms/material-renderers';
import { withJsonFormsControlProps } from '@jsonforms/react';

import {
  DynamicDropdownCustomControl,
  ShadedTopoJsonCustomControl,
} from './JsonFormsDemo';

interface CustomControlSchema extends JsonSchema7 {
  'forms.nby.one/custom-control':
    | ShadedTopoJsonCustomControl
    | DynamicDropdownCustomControl;
}

export const Dropdown = withJsonFormsControlProps(function D({
  ...props
}: ControlProps) {
  const [options, setOptions] = useState<EnumOption[] | null>(null);

  const schema = props.schema as CustomControlSchema;

  const conn = schema['forms.nby.one/custom-control'].data.sourceConnection;

  useEffect(() => {
    setTimeout(() => {
      console.log(conn);
      setOptions(enums);
    }, 5000);
  }, []);

  if (!options) return <div>Loading...</div>;
  return <MaterialEnumControl {...props} options={options ?? []} />;
});

const enums: EnumOption[] = [
  {
    value: 'a',
    label: 'Option A',
  },
  {
    value: 'b',
    label: 'Option B',
  },
  {
    value: 'c',
    label: 'Option C',
  },
];
