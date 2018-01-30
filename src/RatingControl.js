import * as React from 'react';
import {
  rankWith,
  scopeEndsWith,
  mapStateToControlProps,
  mapDispatchToControlProps
} from '@jsonforms/core';
import { connect } from 'react-redux';
import { Rating } from './Rating';

export const ratingControlTester = rankWith(Number.MAX_VALUE, scopeEndsWith('rating'));

const RatingControl = ({ data, handleChange, path }) => (
  <Rating
    value={data}
    onClick={ev => handleChange(path, Number(ev.value))}
  />
);

export default connect(
  mapStateToControlProps,
  mapDispatchToControlProps,
)(RatingControl);
