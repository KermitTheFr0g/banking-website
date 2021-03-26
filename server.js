const express = require("express");
const app = express();

const session = require("express-session"); 
const bodyParser = require("body-parser");
require("dotenv").config();
const ejs = require("ejs");

const port = 3000 
//|| process.env.port;

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

// this allows the client to be able to access the
app.use(express.static("./public"));
app.set("view engine", "ejs");

// routes for different pages
const routes = require("./routes/routes");
const user = require("./routes/user");
const dashboard = require("./routes/dashboard");
const admin = require("./routes/admin");
const loan = require("./routes/loan");
const account = require("./routes/account");
const transaction = require("./routes/transaction");


app.use("/", routes);
app.use("/dashboard", dashboard)
app.use("/admin", admin);
app.use("/api/user", user);
app.use("/api/loan", loan)
app.use("/api/account", account)
app.use("/api/transaction", transaction);


app.get("/test", (req, res) => {
    console.log(req.session)

    return res.send("test done")
})

app.post("/epic", (req, res) => {
    console.log(req.body);
    if(req.body.juice == "pog"){
        return res.send("nice it worked")
    } else {
        return res.send("yeah it didnt work lol")
    }
})

app.listen(port, () => {
    console.log("server up and running");
    console.log("on port " + port);
    //process.env.port);
})