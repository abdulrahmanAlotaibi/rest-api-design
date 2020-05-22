const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// parsed incoming requests to json format : application/json
app.use(express.json({ extended: false }));

app.use(morgan("dev"));

// connect to the database
connectDB();

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/api/v1/roadmaps", require("./routes/roadmaps"));
app.use("/api/v1/roadmaps/:roadmapId/paths", require("./routes/paths"));

app.use("/", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Not Found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⛳ server is connected on port: ${PORT} `);
});
