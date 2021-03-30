const db = require("../database");
const validation = require("../validation/user");

var loan = {
    createLoan: async function(user) {
        // check the user has an account

        //ensures the user does not have 4 accounts already
        const loans = await db.promise().query("SELECT * FROM loan WHERE customer_id = ?", [user.customer_id]);
        if(loans[0].length > 6){
            return "EXCEEDED MAXIMUM LOANS"
        }

        const accounts = await db.promise().query("SELECT * FROM account WHERE customer_id = ? AND account_id = ?", 
        [
            user.customer_id,
            user.account_id
        ]);

        // if the user doesnt have an account then the user is returned with tis error message
        if(!accounts[0].length > 0){
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
        const addedMoney = await db.promise().query("UPDATE account SET balance = balance + ? WHERE customer_id = ? AND account_id = ?", 
        [
            user.amount,
            user.customer_id,
            user.account_id
        ])
        
        // before returning money needs to be added to the user's account
        return "CREATED";
    },

    payLoan: async function(user) {
        // make sure that they are not overpaying for the loan

        // verifying that the user has the money in the account to pay for the loan
        const balance = await db.promise().query("SELECT * FROM account WHERE account_id = ? AND customer_id = ?", 
        [
            user.from,
            user.customer_id
        ])

        // this checks to see if there is account with that id tied to their customer id
        if(!balance[0][0]){
            return "ACCOUNT DOES NOT EXIST";
        }

        // this checks that the balance of that account is as much as they are sending to pay the loan
        if(user.amount > balance[0][0].balance){
            return "INSUFFICIENT FUNDS"
        }

        // this gets the loan that the customer owns
        const loans = await db.promise().query("SELECT * FROM loan WHERE customer_id = ? AND loan_id = ?;", 
        [
            user.customer_id, 
            user.loan_id
        ])


        // if the loan exists then this is where the money will be paid
        if(loans[0].length > 0){ 

             // if the amount the user was paying was more than loan 
            // the amount is adjusted to the exact amount of the loan
            if(user.amount > loans[0][0].loan_amount){
                user.amount = loans[0][0].loan_amount;
            }

            const [result, schema] = await db.promise().query("UPDATE loan SET loan_amount = loan_amount - ? WHERE loan_id = ?", 
            [
                user.amount,
                user.loan_id
            ])

            const paid = await db.promise().query("UPDATE account SET balance = balance - ? WHERE customer_id = ?;", 
            [
                user.amount,
                user.customer_id
            ])

            const completed = await db.promise().query("SELECT * FROM loan WHERE customer_id = ? AND loan_id = ?", 
            [
                user.customer_id,
                user.loan_id
            ]);
            if(completed[0][0].loan_amount == 0 ){
                const removeLoan = await db.promise().query("DELETE FROM loan WHERE customer_id = ? and loan_id = ?", 
                [
                    user.customer_id,
                    user.loan_id
                ]);
            }

        // if the loan does not exist invalid loan id is returned to the user
        }else {
            return "INVALID LOAN ID";
        }

        // if all of thes tests have passed we reach the final return sending the completed message
        return "LOAN_PAID"
    },

    getLoans: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM loan WHERE customer_id = ?", [user.customer_id]);
        return result;
    }

}

module.exports = loan;