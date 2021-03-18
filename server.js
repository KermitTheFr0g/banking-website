const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.port;
const routes = require("./routes/routes");

//middleware
app.use(express.json());

// routes for different pages
app.use("/", routes)


app.listen(port, () => {
    console.log("server up and running");
    console.log("on port " + port);
})