export const DELETE_USER = {
  status: 200,
  schema: {
    example: {
      message: 'Successfully deleted',
      deleted: '2023-02-01T16:53:51.608Z',
    },
  },
};

export const CREATE_USER = {
  status: 201,
  schema: { example: { email: 'email@email.com', created: new Date() } },
};

export const USER = {
  status: 200,
  schema: {
    example: {
      id: 0,
      name: '[string]',
      email: '[string]',
      passwordHash: '[string]',
      englishLevel: null,
      technicalKnowledge: null,
      cvLink: null,
      updated: new Date(),
      deletedAt: null,
    },
  },
};

export const USERS = {
  status: 200,
  schema: {
    
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer'},
          name: { type: 'string'},
          email: { type: 'string'}
        }
      }
    
  }
}
