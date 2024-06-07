import { withJsonFormsControlProps } from '@jsonforms/react';
import { Rating } from './Rating';

interface RatingControlProps {
  data: number;
  handleChange(path: string, value: number): void;
  path: string;
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
  <Rating
    value={data}
    updateValue={(newValue: number) => handleChange(path, newValue)}
  />
);

// Fast refresh can't handle anonymous components.
const RatingControlWithJsonForms = withJsonFormsControlProps(RatingControl);
export default RatingControlWithJsonForms;
