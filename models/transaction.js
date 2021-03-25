const db = require("../database");
const account = require("./account");

var transaction = {
    pay: async function(user, receiving){

        // check the user account exists
        const accounts = await db.promise().query("SELECT * FROM accounts WHERE account_id = ? AND customer_id = ?", 
        [
            user.account_id,
            user.customer_id
        ]);

        if(!accounts[0].length > 0){
            return "INCORRECT ACCOUNT ID";
        }

        const recievingAccount = await db.promise().query("SELECT * FROM accounts WHERE account_id = ?", 
        [
            recieving.account_id
        ]);

        return "PAYMENT HAS BEEN MADE";
    }
}