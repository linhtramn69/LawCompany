const express = require("express");
const image = require("../controllers/image.controller")

const router = express.Router();

router.route("/")
    .get(image.findAll)
    .post(image.create);

router.route("/:id")
    .get(image.findById)
    .put(image.update)
    .delete(image.delete);

module.exports = router;