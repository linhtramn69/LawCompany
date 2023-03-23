const express = require("express");
const task = require("../controllers/task.controller")

const router = express.Router();

router.route("/")
    .get(task.findAll)
    .post(task.create);

router.route("/:id")
    .get(task.findById)
    .put(task.update)
    .delete(task.delete);

module.exports = router;