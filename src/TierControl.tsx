import * as React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Tier } from './Tier';

interface TierControlProps {
    data: any,
    handleChange(path: string, value: any): void;
    path: string;
}

const TierControl = ({ data, handleChange, path }: TierControlProps) => (
    <Tier
        value={data}
    />
);

export default withJsonFormsControlProps(TierControl);