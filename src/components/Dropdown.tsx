import { useEffect, useState } from 'react';

import { ControlProps, EnumOption, JsonSchema7 } from '@jsonforms/core';
import { MaterialEnumControl } from '@jsonforms/material-renderers';
import { withJsonFormsControlProps } from '@jsonforms/react';

import {
  DynamicDropdownCustomControl,
  ShadedTopoJsonCustomControl,
  InlineDropdownCustomControl,
} from './JsonFormsDemo';

interface CustomControlSchema extends JsonSchema7 {
  'forms.nby.one/custom-control':
    | ShadedTopoJsonCustomControl
    | DynamicDropdownCustomControl
    | InlineDropdownCustomControl;
}

/*export const Dropdown = withJsonFormsControlProps(function D({
  ...props
}: ControlProps) {
  const [options, setOptions] = useState<EnumOption[] | null>(null);

  const schema = props.schema as CustomControlSchema;
  const meta = schema['forms.nby.one/custom-control'];
  if (!meta) {
    return <MaterialEnumControl {...props} />;
  }

  let val: string;
  let opts: EnumOption[] = [];
  if (meta.type == 'inline-dropdown') {
    const field = meta.data.sourceField;
    const rootData = (props as any).rootData;
    const raw = rootData?.[field] ?? [];
    opts = (raw as string[]).map(v => ({ value: v, label: v }));
  } else {
    val = meta.data.sourceConnection;
    opts = enums;
    useEffect(() => {
      setTimeout(() => {
        console.log(val);
        setOptions(opts);
      }, 5000);
    }, []);
  }

  if (!options) return <div>Loading...</div>;
  return <MaterialEnumControl {...props} options={options ?? []} />;
});*/

export const Dropdown = withJsonFormsControlProps(function D(
  props: ControlProps,
) {
  const schema = props.schema as CustomControlSchema;
  const meta = schema['forms.nby.one/custom-control'];

  if (!meta) {
    return <MaterialEnumControl {...props} />;
  }

  let opts: EnumOption[] = [];

  if (meta.type === 'inline-dropdown') {
    const field = meta.data.sourceField; // "Values"
    const rootData = (props as any).config?.rootData ?? {};
    const raw = rootData[field];

    if (Array.isArray(raw)) {
      opts = (raw as unknown[]).map((v): EnumOption => {
        const s = String(v);
        return { value: s, label: s };
      });
    } else {
      console.warn(
        '[Dropdown] rootData["' + field + '"] is not an array:',
        raw,
      );
      opts = [];
    }
  } else {
    // stub para dynamic-dropdown / shaded-topojson
    opts = enums;
  }

  return <MaterialEnumControl {...props} options={opts} />;
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
