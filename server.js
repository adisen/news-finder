const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
require("dotenv").config();

const app = express();

// Connect the database
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Static files
app.use(express.static(path.join(__dirname, "/client/build")));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/news", require("./routes/api/news"));
app.use("/api/author", require("./routes/api/authors"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
