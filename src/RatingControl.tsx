import * as React from 'react';
import {mapDispatchToControlProps, mapStateToControlProps} from '@jsonforms/core';
import {connect} from 'react-redux';
import {Rating} from './Rating';

interface RatingControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
  <Rating
    value={data}
    onClick={(ev: any) => handleChange(path, Number(ev.value))}
  />
);

export default connect(
  mapStateToControlProps,
  mapDispatchToControlProps,
)(RatingControl as any);
