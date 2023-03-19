const express = require("express");
const field = require("../controllers/field.controller");

const router = express.Router();

router.route("/")
    .get(field.findAll)
    .post(field.create);

router.route("/:id")
    .get(field.findById)
    .post(field.findByName)
    .put(field.update)
    .delete(field.delete);

    
module.exports = router;