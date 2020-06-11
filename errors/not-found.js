const status = require("statuses");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status("Not Found");
  }
}

module.exports = NotFoundError;
