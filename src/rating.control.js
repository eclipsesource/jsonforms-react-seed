import * as React from 'react';
import {
  Control,
  rankWith,
  refEndsWith,
  mapStateToFieldProps,
  mapDispatchToFieldProps
} from '@jsonforms/core';
import { connect } from 'react-redux';
import { Rating } from './Rating';

/**
 * Default tester for integer controls.
 */
export const ratingControlTester = rankWith(Number.MAX_VALUE, refEndsWith('rating'));

export class RatingControl extends Control {

  /**
   * @inheritDoc
   */
  render() {
    return (
      <Rating
        value={this.props.data}
        onClick={ev =>
          this.props.handleChange(this.props.path, () => ev.value)
        }
        id={this.props.id}
      />
    );
  }

}

export default connect(mapStateToFieldProps, mapDispatchToFieldProps)(RatingControl);
