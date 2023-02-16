const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const courseCategoryRouter = require("./src/routes/courseCategoryRoute");
const courseRouter = require("./src/routes/courseRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/kelas/kategori", courseCategoryRouter);
app.use("/api/kelas", courseRouter);

app.listen(PORT, () => {
  console.log(`Server Berjalan di Port : ${PORT}`);
});
