const db = require("../database");
const account = require("./account");

var transaction = {
    pay: async function(user, receiving){

        // check if the first account exists and is owned by the user

        // check if the second account exists

        // ensure the account has enough balance

        //create transaction log for sending the money from account

        // create transaction log for recieving money on other account  


        return "PAYMENT HAS BEEN MADE";
    }
}

module.exports = transaction;