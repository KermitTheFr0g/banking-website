const express = require("express");

const app = express();

const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = 3000 || process.env.port;

//middleware
//initialising sessions
app.use(session({
    secret: "my secret key!",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false
    }
}))

//initialising the body parser to be able to read post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
    db.query("SELECT * FROM account", function(err, results){
        if(err){
            throw err;
        }
        res.send(results);
    })
})

// routes for different pages
const routes = require("./routes/routes");
const user = require("./routes/user");
const dashboard = require("./routes/dashboard");

app.use("/", routes);
app.use("/dashboard", dashboard)
app.use("/api/user", user);

// this allows the client to be able to access the
app.use(express.static("./public"));

app.listen(port, () => {
    console.log("server up and running");
    console.log("on port " + process.env.port);
})