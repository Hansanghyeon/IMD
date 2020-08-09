const express = require("express");
const route = require("./route.js");
const app = express();

app.use("/", route);
app.use((req, res, next) => {
  res.status(404).send("일치하는 주소가 없습니다!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("서버 에러!");
});

app.listen(8080, function () {
  console.log("server running on 8080");
}); //the server object listens on port 8080
