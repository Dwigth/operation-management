export const ForbiddenResource = {
  status: 403,
  schema: {
    example: {
      statusCode: 403,
      message: 'Forbidden resource',
      error: 'Forbidden',
    },
  },
};
export const NotFound = {
  status: 404,
  schema: {
    example: {
      statusCode: 404,
      message: 'Not Found',
    },
  },
};
