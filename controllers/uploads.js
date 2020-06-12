const status = require("statuses");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { BadRequestError } = require("../errors");

const uploadProductImage = async (req, res) => {
  const tempFilePath = req.files.image.tempFilePath;
  // Basic cloudinary setup
  const result = await cloudinary.uploader.upload(tempFilePath, {
    use_filename: true,
    folder: "Image-Upload-Cloudinary",
  });

  fs.unlink(tempFilePath, (err) => {
    if (err)
      throw new BadRequestError(
        `Unable to delete temporary file from disk filePath:${tempFilePath}`
      );
  });

  res.status(status("OK")).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
