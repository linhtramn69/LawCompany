const express = require("express");
const file = require("../controllers/file.controller")

const router = express.Router();

router.route("/")
    .get(file.findAll)
    .post(file.create);

router.route("/:id")
    .get(file.findById)
    .put(file.update)
    .delete(file.delete);

module.exports = router;