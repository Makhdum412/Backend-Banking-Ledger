const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


//TODO: Add authentication routes
const authRouter = require("./routes/auth.routes")
// TODO: Add account routes
const accountRouter = require("./routes/account.routes")

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);

module.exports = app;