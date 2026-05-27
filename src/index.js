// Configurações
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;

const routes = require("./routes");

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
