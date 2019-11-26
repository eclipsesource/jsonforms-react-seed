import React from 'react';
import {
  CellProps,
  isControl,
  RankedTester,
  rankWith,
  WithClassname
} from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';

export const SampleCellBase = (_props: CellProps & WithClassname) => {
  console.log('SAMPLE');
  return <>SAMPLE</>;
};

export const sampleCellTester: RankedTester = rankWith(
  Number.MAX_SAFE_INTEGER,
  isControl
);

const SampleCell = withJsonFormsCellProps(SampleCellBase)

export default SampleCell;
export const sampleCell = { cell: SampleCell, tester: sampleCellTester };
