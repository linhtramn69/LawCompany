const express = require("express");
const registerForm = require("../controllers/registerForm.controller")

const router = express.Router();

router.route("/")
    .get(registerForm.findAll)
    .post(registerForm.create);

router.route("/:id")
    .get(registerForm.findById)
    .put(registerForm.update)
    .delete(registerForm.delete);

module.exports = router;