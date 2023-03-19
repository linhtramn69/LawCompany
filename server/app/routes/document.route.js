const express = require("express");
const document = require("../controllers/document.controller")

const router = express.Router();

router.route("/")
    .get(document.findAll)
    .post(document.create);

router.route("/:id")
    .get(document.findById)
    .put(document.update)
    .delete(document.delete);

module.exports = router;