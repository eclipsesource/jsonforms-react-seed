import {
  TranslateProps,
  withJsonFormsEnumProps,
  withTranslateProps,
} from '@jsonforms/react';
import { Region } from './Region';
import { ControlProps, OwnPropsOfEnum } from '@jsonforms/core';
import { WithOptionLabel } from '@jsonforms/material-renderers';
import React from 'react';

const RegionControl = (
  props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps
) => <Region {...props} />;

export default withJsonFormsEnumProps(
  withTranslateProps(React.memo(RegionControl)),
  false
);
