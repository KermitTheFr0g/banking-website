const db = require("../database");

var transaction = {
    pay: async function(user, receiving){

        // check if the first account exists and is owned by the user

        // check if the second account exists

        // ensure the account has enough balance

        //create transaction log for sending the money from account

        // create transaction log for recieving money on other account  


        return "PAYMENT HAS BEEN MADE";
    },

    getTransactions: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM transaction WHERE customer_id = ?", [user.customer_id]);

        if(result.length > 0){
            return result;
        } else {
            return "NO TRANSACTIONS FOUND";
        }
    }

}

module.exports = transaction;