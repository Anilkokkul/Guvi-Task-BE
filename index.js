const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const app = express();
const { db } = require("./db/connect");
db();
const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(express.json());
app.use(authRoutes);
app.use(cors(corsOptions));
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => [
  console.log(`Server is running on port http://localhost:${port}`),
]);
