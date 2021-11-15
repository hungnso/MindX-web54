const { singUp, login } = require("./auth.controller");

const router = require("express").Router();

/// Đăng ký và đăng nhập
router.post("/singup", singUp);
router.post("/login", login);

module.exports = router;
