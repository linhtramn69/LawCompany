const express = require("express");
const quoteForm = require("../controllers/quoteForm.controller")

const router = express.Router();

router.route("/")
    .get(quoteForm.findAll)
    .post(quoteForm.create);

router.route("/:id")
    .get(quoteForm.findById)
    .put(quoteForm.update)
    .delete(quoteForm.delete);

module.exports = router;