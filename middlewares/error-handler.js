const status = require("statuses");

module.exports = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || status("Internal Server Error"),
    msg: err.message || "Something went wrong, please try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = status("Bad Request");
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = status("Bad Request");
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = status("Not Found");
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
