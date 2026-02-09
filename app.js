const express = require("express");
const app = express();
const port = 3000;
const postRoutes = require("./routes/routesPost");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>home</h1>");
});

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
