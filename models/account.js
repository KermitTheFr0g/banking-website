const db = require("../database");

var account = {

    openAccount: async function(user) {
        // make sure the type id is an actual type that exists either 1 2 3 4
        var types = [1, 2, 3, 4]
        if(!types.includes(user.type_id)){
            return "TYPE IS NOT RECOGNISED";
        }

        //ensures the user does not have 4 accounts already
        const accounts = await db.promise().query("SELECT COUNT(customer_id) FROM account WHERE customer_id = ?", [user.customer_id]);
        if(accounts[0][0]['COUNT(customer_id)'] > 4){
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
        const [result, schema] = await db.promise().query("SELECT COUNT(customer_id) FROM account WHERE customer_id = ?", [user.customer_id])
        if(!result[0]['COUNT(customer_id)'] > 0){
            return "THIS USER HAS NO ACCOUNTS";
        }

        return result;
    },


    checkAccounts: async function(user){
        const [balances, other] = await db.promise().query("SELECT * FROM account WHERE customer_id = ?", [user.customer_id]);
        
        if(!balances[0]){
            var accountid_1 = 0
        } else {
            var accountid_1 = balances[0].account_id
            var accountbalance_1 = balances[0].balance
        }

        if(!balances[1]){
            var accountid_2 = 0
        } else {
            var accountid_2 = balances[1].account_id
            var accountbalance_2 = balances[1].balance
        }

        if(!balances[2]){
            var accountid_3 = 0
        } else {
            var accountid_3 = balances[2].account_id
            var accountbalance_3 = balances[2].balance
        }

        if(!balances[3]){
            var accountid_4 = 0
        } else {
            var accountid_4 = balances[3].account_id
            var accountbalance_4 = balances[3].balance
        }

        var returningBalance = {
            id1: accountid_1,
            balance1: accountbalance_1 || 0,
            id2: accountid_2,
            balance2: accountbalance_2 || 0,
            id3: accountid_3,
            balance3: accountbalance_3 || 0,
            id4: accountid_4,
            balance4: accountbalance_4 || 0,
            amount: balances.length
        }

        return returningBalance;

    }
}

module.exports = account;