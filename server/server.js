const express = require("express");
const bodyParser = require("body-parser");
const stockRouter = require("./apis/routes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELTE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", stockRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
