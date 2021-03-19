const express = require("express");
const app = express();

const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "banking_website"
});

db.connect(function(error) {
    if(error){
        throw error;
    }
    console.log("we have connected!");
})

app.get("/db", (req, res) => {
    db.query("SELECT * FROM albums", function(err, results){
        if(err){
            throw err;
        }
        res.send(results);
    })
})

const routes = require("./routes/routes");
const login = require("./routes/login");


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes for different pages
app.use("/", routes);
app.use("/api/user", login);

// this allows the client to be able to access the
app.use(express.static("./public"));

app.listen(process.env.port, () => {
    console.log("server up and running");
    console.log("on port " + process.env.port);
})