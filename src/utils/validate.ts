import Ajv from 'ajv';
import { JsonSchema7, UISchemaElement } from '@jsonforms/core';

const ajv = new Ajv({ allErrors: true });

export const validate = (schema: JsonSchema7, data: any) => {
  const validateFn = ajv.compile(schema);
  const valid = validateFn(data);
  return {
    valid: !!valid,
    errors: validateFn.errors || [],
  };
};
