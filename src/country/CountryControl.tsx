import {
  TranslateProps,
  withTranslateProps,
  withJsonFormsEnumProps,
} from '@jsonforms/react';
import { Country } from './Country';
import { ControlProps, OwnPropsOfEnum } from '@jsonforms/core';
import { WithOptionLabel } from '@jsonforms/material-renderers';
import React from 'react';

const CountryControl = (
  props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps
) => <Country {...props} />;

export default withJsonFormsEnumProps(
  withTranslateProps(React.memo(CountryControl)),
  false
);
