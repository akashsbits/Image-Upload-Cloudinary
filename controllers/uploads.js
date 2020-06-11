const status = require("statuses");
const formidable = require("formidable");
const path = require("path");
const { rename } = require("fs");
const { randomBytes } = require("crypto");
const { BadRequestError, PayloadError } = require("../errors");

const fileName = () => randomBytes(8).toString("hex");

const uploadProductImage = (req, res) => {
  const form = new formidable.IncomingForm();
  const maxFileSize = 1 * 1024 * 1024; // 1mb
  const minFileSize = 1 * 1024; // 1kb
  let filename;

  form.uploadDir = path.join(__dirname, "../public/uploads");

  form.on("progress", (bytesReceived, bytesExpected) => {
    if (bytesExpected < minFileSize)
      throw new BadRequestError(
        `File is too small, expectBytes: ${minFileSize} or more`
      );
    if (bytesExpected > maxFileSize)
      throw new PayloadError(`File is too large, expectBytes: ${maxFileSize}`);
  });

  form.on("file", (field, file) => {
    filename = fileName() + path.extname(file.name);
    rename(file.path, path.join(form.uploadDir, filename), (err) => {
      if (err) throw err;
    });
  });

  form.on("error", (err) => {
    throw new Error("An error occured while uploading the file.");
  });

  form.on("end", () =>
    res.status(status("OK")).json({ image: { src: filename } })
  );

  form.parse(req);
};

module.exports = { uploadProductImage };
