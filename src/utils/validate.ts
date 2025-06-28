import Ajv from 'ajv';
import { JsonSchema7, UISchemaElement } from '@jsonforms/core';

const ajv = new Ajv({ allErrors: true });
// TODO: Register common formats via `ajv-formats` and custom keywords needed
// for the builder. Once we start surfacing validation errors to the user we
// should also integrate `ajv-errors` for friendlier messages.

export const validate = (schema: JsonSchema7, data: any) => {
  const validateFn = ajv.compile(schema);
  const valid = validateFn(data);
  return {
    valid: !!valid,
    errors: validateFn.errors || [],
  };
};
