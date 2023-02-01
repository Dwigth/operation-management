export const RESPONSES = {
  CREATE: {
    status: 201,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        created: { type: 'string', format: 'date-time' },
      },
    },
  },
  GET_ONE: {
    status: 200,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        accountName: { type: 'string' },
        clientName: { type: 'string' },
        operationManagerName: { type: 'string' },
      },
    },
  },
  GET_MANY: {
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          accountName: { type: 'string' },
          clientName: { type: 'string' },
          operationManagerName: { type: 'string' },
        },
      },
    },
  },
};
