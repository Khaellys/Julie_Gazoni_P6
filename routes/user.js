const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordCheck = require('../middleware/password');
const max = require('../middleware/limiter');

router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", passwordCheck, max.limiter, userCtrl.login);

module.exports = router;
