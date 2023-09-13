import React, { useEffect } from 'react';
import { useState } from 'react';
import { APIContext } from '../App';
import { ControlProps, JsonSchema, OwnPropsOfEnum } from '@jsonforms/core';
import { TranslateProps } from '@jsonforms/react';
import { CircularProgress } from '@mui/material';
import { Unwrapped, WithOptionLabel } from '@jsonforms/material-renderers';

const { MaterialEnumControl } = Unwrapped;

type JsonSchemaWithDependenciesAndEndpoint = JsonSchema & {
  dependent: string[];
  endpoint: string;
};

export const Country = (
  props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps
) => {
  const { handleChange } = props;
  const [options, setOptions] = useState<string[]>([]);
  const api = React.useContext(APIContext);
  const schema = props.schema as JsonSchemaWithDependenciesAndEndpoint;

  const endponit = schema.endpoint;
  const dependent: string[] = schema.dependent ? schema.dependent : [];

  useEffect(() => {
    setOptions([]);
    api.get(endponit).then((result) => {
      setOptions(result);
    });
  }, [api, endponit]);

  if (options.length === 0) {
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
