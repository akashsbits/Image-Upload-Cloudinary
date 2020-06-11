const status = require("statuses");
const CustomAPIError = require("./custom-api");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status("Bad Request");
  }
}

module.exports = BadRequestError;
