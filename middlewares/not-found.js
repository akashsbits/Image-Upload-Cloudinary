const status = require("statuses");

const notFound = (req, res) =>
  res.status(status("Not Found")).send("Requested route does not exist.");

module.exports = notFound;
