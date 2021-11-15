const isAuth = require("../../common/middlewares/isAuth");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
} = require("./products.controller");

const router = require("express").Router();

router.get("/", isAuth, getAllProducts);
router.get("/:productId", getProduct);
router.post("/", createProduct);
router.put("/productId", updateProduct);

module.exports = router;
