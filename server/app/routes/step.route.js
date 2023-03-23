const express = require("express");
const step = require("../controllers/step.controller");

const router = express.Router();

router.route("/")
    .get(step.findAll)
    .post(step.create);

router.route("/:id")
    .put(step.update)
    .delete(step.delete)
    .get(step.findById);

module.exports = router;