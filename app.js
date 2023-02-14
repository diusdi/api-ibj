const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const courseCategoryRoute = require("./src/routes/courseCategoryRoute");
const courseRoute = require("./src/routes/courseRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/category", courseCategoryRoute);
app.use("/course", courseRoute);

app.listen(8080, () => {
  console.log("Server Berjalan di Port : 8080");
});
