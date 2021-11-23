import React from 'react';
import { CellProps, WithClassname } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { Tier } from './Tier';

export const TierCell = (props: CellProps & WithClassname) => {
    const { data, path, handleChange } = props;
    return (
        <Tier
            value={data}
        />
    );
};

export default withJsonFormsCellProps(TierCell);