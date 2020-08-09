const express = require("express");
// const path = require('path');
const router = express.Router();

router.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
router.get("/", (req, res, next) => {
  res.write("Hello World!..."); //write a response to the client
  res.end(); //end the response
});
router.get("/list/notice", (req, res, next) => {
  const result = {
    nextPage: 1,
    items: { id: 0 },
  };
  res.json(result);
});
router.get("/list/notice/:id", (req, res, next) => {
  const id = req.params.id;
  const result = {
    nextPage: id === 100 ? -1 : new Number(id) + 1,
    items: { id: new Number(id) },
  };

  res.json(result);
});

module.exports = router;
