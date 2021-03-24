const db = require("../database");

var loan = {
    createLoan: async function(user) {
        // check the user has an account
        const accounts = await db.promise().query("SELECT * FROM account WHERE customer_id = ?", [user.customer_id]);
        // if the user doesnt have an account then the user is returned with tis error message
        if(!accounts[0].length > 0){
            console.log(accounts[0]);
            return "NO ACCOUNT TO ADD MONEY";
        };

        // this is where the loan is inserted into the db
        const [result, schema] = await db.promise().query("INSERT INTO loan (customer_id, loan_apr, loan_amount, date_created) VALUES (?, 5, ?, ?)", 
        [
            user.customer_id, 
            user.amount,
            user.date
        ]);

        // this is where the money is added to the user's account
        const addedMoney = await db.promise().query("UPDATE account SET balance = balance + ? WHERE customer_id = ?", 
        [
            user.amount,
            user.customer_id
        ])
        
        // before returning money needs to be added to the user's account
        return "CREATED";
    },

    payLoan: async function(user) {
        // add some validation for the payment
        // ensure the user has the money to pay the loan
        // take the money from the bank account

        const balance = await db.promise().query("SELECT * FROM account WHERE account_id = ?", [user.from])
        if(!balance[0]){
            console.log(balance[0])
            return "ACCOUNT DOES NOT EXIST";
        }
        if(amount > balance[0].balance){
            return "INSUFFICIENT FUNDS"
        }

        const loans = await db.promise().query("SELECT * FROM loan WHERE customer_id = ? AND loan_id = ?;", 
        [
            user.customer_id, 
            user.loan_id
        ])

        if(loans[0].length > 0){ 
            const [result, schema] = await db.promise().query("UPDATE loan SET loan_amount = loan_amount - ? WHERE loan_id = ?", 
            [
                user.amount,
                user.loan_id
            ])
        }

        return "LOAN_PAID"
    },

    getLoans: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM loan WHERE customer_id = ?", [user.customer_id]);
        return result;
    }

}

module.exports = loan;