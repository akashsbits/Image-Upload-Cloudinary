const router = require("express").Router();

const { createProduct, getAllProducts } = require("../controllers/product");
const { uploadProductImage } = require("../controllers/uploads");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
