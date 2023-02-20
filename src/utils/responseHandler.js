const responseData = function (response, statusCode, values) {
  var data = {
    success: true,
    data: values,
  };
  if (statusCode >= 400) data.success = false;
  response.status(statusCode).json(data);
  response.end();
};

const responseMessage = function (response, statusCode, message) {
  var data = {
    success: true,
    message: message,
  };
  if (statusCode >= 400) data.success = false;
  response.status(statusCode).json(data);
  response.end();
};

module.exports = { responseData, responseMessage };
