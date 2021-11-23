import {
    rankWith,
    uiTypeIs,
    schemaMatches,
    schemaTypeIs,
    and
} from '@jsonforms/core';

export default rankWith(
    100,
    and(
        uiTypeIs('Control'),
        schemaTypeIs('number'),
        schemaMatches(schema => {
            console.log(schema);
            if (schema.hasOwnProperty('customRender')){
                var cellschema: any = schema;
                return cellschema['customRender'] === 'tier';
            }
            return false;
        })
    )
);