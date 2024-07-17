const express = require("express");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const app = express();
const { db } = require("./db/connect");
db();

app.use(express.json());
app.use(authRoutes);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => [
  console.log(`Server is running on port http://localhost:${port}`),
]);
