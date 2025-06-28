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
  {
    name: 'Contact Form',
    // TODO: Define a more complete schema for capturing user contacts
    schema: {},
    // TODO: Provide a uiSchema with sensible defaults
    uiSchema: {},
  },
  {
    name: 'Survey',
    // TODO: Implement a multi-step survey template
    schema: {},
    uiSchema: {},
  },
  // TODO: Add even more templates here as the library grows
];
