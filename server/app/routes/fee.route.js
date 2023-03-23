const express = require("express");
const fee = require("../controllers/fee.controller")

const router = express.Router();

router.route("/")
    .get(fee.findAll)
    .post(fee.create);

router.route("/:id")
    .get(fee.findById)
    .put(fee.update)
    .delete(fee.delete);

module.exports = router;