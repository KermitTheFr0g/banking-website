const db = require("../database");

var account = {

    openAccount: async function(user) {
        // make sure the type id is an actual type that exists either 1 2 3 4
        var types = [1, 2, 3, 4]
        if(!types.includes(user.type_id)){
            return "TYPE IS NOT RECOGNISED";
        }

        //ensures the user does not have 4 accounts already
        const accounts = await db.promise().query("SELECT * FROM account WHERE customer_id = ?", [user.customer_id]);
        if(accounts[0].length > 4){
            return "EXCEEDED MAXIMUM ACCOUNTS"
        }

        // this inserts the 
        const [result, schema] = await db.promise().query("INSERT INTO account (customer_id, type_id) VALUES(?, ?)", 
        [
            user.customer_id,
            user.type_id
        ])

        return "SUCESSFULLY CREATED ACCOUNT";
    },

    closeAccount: async function(user) {



    },

    viewAccounts: async function(user){
        // making a db call for all the accounts that are tied to the users 
        const [result, schema] = await db.promise().query("SELECT * FROM account WHERE customer_id = ?", [user.customer_id])
        if(!result.length > 0){
            return "THIS USER HAS NO ACCOUNTS";
        }

        return result;
    }

}

module.exports = account;