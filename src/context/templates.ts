export const templates = [
  {
    name: 'Task',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
        description: { type: 'string', title: 'Description' },
        done: { type: 'boolean', title: 'Done' },
      },
    },
    uiSchema: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/name' },
        { type: 'Control', scope: '#/properties/description' },
        { type: 'Control', scope: '#/properties/done' },
      ],
    },
  },
];
