// index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const flightRoutes = require("./routes/flightRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());
app.use("/api", flightRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
