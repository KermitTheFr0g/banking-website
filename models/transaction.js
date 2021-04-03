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
        if(!account[0][0].balance > user.amount){
            return "INSUFFICIENT FUNDS";
        }

        // taking money from account
        console.log(account[0][0].balance)
        console.log(user.amount);
        account[0][0].balance -= user.amount;

        // adding money to receiving account
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
        const [result, schema] = await db.promise().query("SELECT * FROM transaction WHERE customer_id = ?", [user.customer_id]);

        if(result.length > 0){
            return result;
        } else {
            return "NO TRANSACTIONS FOUND";
        }
    }

}

module.exports = transaction;