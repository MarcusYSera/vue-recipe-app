export const sendResponse = ({ res, statusCode = 200, message = 'success', responseBody }) => {
  res.status(statusCode).send({
    data: responseBody,
    status: true,
    message,
  });
};

export const sendErrorResponse = ({ res, statusCode = 500, message = 'error', responseBody }) => {
  res.status(statusCode).send({
    data: responseBody,
    status: false,
    message,
  });
};

// module.exports = {
//   sendErrorResponse,
//   sendResponse,
// };
