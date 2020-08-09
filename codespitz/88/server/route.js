const express = require("express");
// const path = require('path');
const router = express.Router();

router.get("/", (req, res) => {
  res.write("Hello World!..."); //write a response to the client
  res.end(); //end the response
});
router.get("/list/notice/:id", (req, res) => {
  res.write("notice page");
  res.end();
});

module.exports = router;
