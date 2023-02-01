export const RESPONSES = {
  LOGIN: {
    status: 201,
    schema: {
      example: {
        accessToken: '[JWT_TOKEN]',
      },
    },
  },
};

export const SCHEMAS = {
  LOGIN: {
    schema: {
      example: {
        email: 'string',
        password: 'string',
      },
    },
  },
};
