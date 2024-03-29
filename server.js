const express = require("express");
const app = express();

const session = require("express-session"); 
const bodyParser = require("body-parser");
require("dotenv").config();

const port = 3000 
//|| process.env.port;

//middleware
//initialising sessions
app.use(session({
    secret: "super secret bro",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false
    }
}))

//initialising the body parser to be able to read post requests
app.use(express.json());

// this allows the client to be able to access the
app.set("view engine", "ejs");
app.use("/public", express.static("public"))

// routes for different pages
const routes = require("./routes/routes");
const user = require("./routes/user");
const dashboard = require("./routes/dashboard");
const adminDashboard = require("./routes/adminDashboard");
const admin = require("./routes/admin");
const loan = require("./routes/loan");
const account = require("./routes/account");
const transaction = require("./routes/transaction");


app.use("/", routes);
app.use("/dashboard", dashboard)
app.use("/admin", adminDashboard);
app.use("/api/admin", admin)
app.use("/api/user", user);
app.use("/api/loan", loan)
app.use("/api/account", account)
app.use("/api/transaction", transaction);

app.get("/test", (req, res) => {
    console.log(req.session)
    return res.send("test done")
});

app.listen(port, () => {
    console.log("server up and running");
    console.log("on port " + port);
    //process.env.port);
});

// ip = 192.168.64.90