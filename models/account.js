const db = require("../database");

var account = {

    openAccount: async function(user) {
        // add some validation
        // ensure that the user cannot open more than 3 accounts

        const [result, schema] = await db.promise().query("INSERT INTO account (customer_id, type_id) VALUES(?, ?)", 
        [
            user.customer_id,
            user.type_id
        ])

        return result;
    },

    viewAccounts: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM account WHERE customer_id = ?", [user.customer_id])
        if(!result.length > 0){
            return false;
        }

        return result;
    }

}

module.exports = account;