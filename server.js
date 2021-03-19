const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.port;
const routes = require("./routes/routes");
const login = require("./routes/login");


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes for different pages
app.use("/", routes);
app.use("/api/user", login);

app.listen(port, () => {
    console.log("server up and running");
    console.log("on port " + port);
})