const db = require("../database");

var transaction = {
    pay: async function(user){
        // check if the second account exists
        const receivingAccount = await db.promise().query("SELECT * FROM account WHERE account_id = ?", [user.receivingAct]);
        if(!receivingAccount[0].length > 0){
            return "RECEIVING ACCOUNT DOESNT EXIST"
        }

        // check if the first account exists and is owned by the user
        const account = await db.promise().query("SELECT * FROM account WHERE customer_id = ? AND account_id = ?",
        [
            user.customer_id,
            user.sendingAct
        ]);
        
        if(!account[0].length > 0 ){
            return "ACCOUNT DOESNT EXIST";
        }

        // ensure the account has enough balance
        if(user.amount > parseInt(account[0][0].balance)){
            return "INSUFFICIENT FUNDS";
        }


        // taking money from account
        const updateAccount = await db.promise().query("UPDATE account SET balance = balance - ? WHERE account_id = ?", 
        [
            user.amount,
            user.sendingAct
        ])

        // adding money to receiving account
        const updateReceivingAccount = await db.promise().query("UPDATE account SET balance = balance + ? WHERE account_id = ?",
        [
            user.amount,
            user.receivingAct
        ])
        receivingAccount[0][0].balance += user.amount;


        // create transaction log for sending the money from account
        const sendingLog = await db.promise().query("INSERT INTO transaction (customer_id, account_id, incoming, tx_acfrom, tx_acto, tx_amount, dateOfTx) VALUES (?, ?, 0, ?, ?, ?, ?)", 
        [
            user.customer_id, 
            user.sendingAct,
            user.sendingAct,
            user.receivingAct,
            user.amount,
            user.date
        ])

         // create transaction log for recieving money on other account  
        const receivingLog = await db.promise().query("INSERT INTO transaction (customer_id, account_id, incoming, tx_acfrom, tx_acto, tx_amount, dateOfTx) VALUES (?, ?, 1, ?, ?, ?, ?)",
        [
            user.customerReceiving, 
            user.receivingAct,
            user.sendingAct,
            user.receivingAct,
            user.amount,
            user.date
        ])

    
        return "PAYMENT SUCCESSFUL";
    },

    getTransactions: async function(user){
        if(user.account == "ALL"){
            const allAccounts = await db.promise().query("SELECT * FROM transaction WHERE customer_id = ?", [user.customer_id]);
            if(allAccounts[0].length > 0){
                return allAccounts[0];
            } else {
                return "NO ACCOUNT FOUND";
            }
        } else {
            const singleAccount = await db.promise().query("SELECT * FROM transaction WHERE customer_id = ? AND account_id = ?",
            [
                user.customer_id,
                user.account_id
            ]);
            if(singleAccount[0].length > 0){
                return singleAccount[0][0]
            } else {
                return "NO ACCOUNT FOUND";
            } 
        }
    }
}

module.exports = transaction;