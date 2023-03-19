const express = require("express");
const user = require("../controllers/user.controller")

const router = express.Router();

router.route("/")
    .get(user.findAll)
    .post(user.create);

router.route("/:id")
    .get(user.findById)
    .put(user.update)
    .delete(user.delete);

router.route("/login")
    .post(user.login);

module.exports = router;