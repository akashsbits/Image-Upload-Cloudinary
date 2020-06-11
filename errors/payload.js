const status = require("statuses");
const CustomAPIError = require("./custom-api");

class PayloadError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status("Payload Too Large");
  }
}

module.exports = PayloadError;
