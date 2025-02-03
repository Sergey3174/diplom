const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/posts", require("./post"));
router.use("/users", require("./user"));
router.use("/main", require("./main"));
router.use("/transaction", require("./transaction"));
router.use("/account", require("./account"));
router.use("/category", require("./category"));

module.exports = router;
