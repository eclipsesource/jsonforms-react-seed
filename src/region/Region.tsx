import React from 'react';
import { useState } from 'react';
import { APIContext } from '../App';
import { ControlProps, JsonSchema, OwnPropsOfEnum } from '@jsonforms/core';
import { TranslateProps, useJsonForms } from '@jsonforms/react';
import { CircularProgress } from '@mui/material';
import { Unwrapped, WithOptionLabel } from '@jsonforms/material-renderers';
const { MaterialEnumControl } = Unwrapped;

type JsonSchemaWithDependenciesAndEndpont = JsonSchema & {
  dependent: string[];
  endpoint: string;
};

export const Region = (
  props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps
) => {
  const schema = props.schema as JsonSchemaWithDependenciesAndEndpont;
  const { handleChange } = props;
  const [options, setOptions] = useState<string[]>([]);
  const api = React.useContext(APIContext);
  const country = useJsonForms().core?.data.country;
  const [previousCountry, setPreviousCountry] = useState<String>();

  const endponit = schema.endpoint;
  const dependent: string[] = schema.dependent ? schema.dependent : [];

  if (previousCountry !== country) {
    setOptions([]);
    setPreviousCountry(country);
    api.get(endponit + '/' + country).then((result) => {
      setOptions(result);
    });
  }

  if (options.length === 0 && country !== undefined) {
    return <CircularProgress />;
  }

  return (
    <MaterialEnumControl
      {...props}
      handleChange={(path: string, value: any) => {
        handleChange(path, value);
        dependent.forEach((path) => {
          handleChange(path, undefined);
        });
      }}
      options={options.map((option) => {
        return { label: option, value: option };
      })}
    />
  );
};
