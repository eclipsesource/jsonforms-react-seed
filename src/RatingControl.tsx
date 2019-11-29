import * as React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Rating } from './Rating';

interface RatingControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
  <Rating
    value={data}
    onClick={(ev: any) => handleChange(path, Number(ev.value))}
  />
);

export default withJsonFormsControlProps(RatingControl);
