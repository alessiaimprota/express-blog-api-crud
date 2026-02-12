const express = require("express");
const app = express();
const port = 3000;
const postRoutes = require("./routes/routesPost");
//importo middlewares
const notFound = require("./middlewares/notFound");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>home</h1>");
});

app.use("/posts", postRoutes);

app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
