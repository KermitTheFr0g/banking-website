const db = require("../database");

var loan = {
    createLoan: async function(user) {
        const [result, schema] = await db.promise().query("INSERT INTO loan (customer_id, loan_apr, loan_amount, date_created) VALUES (?, 5, ?, ?)", 
        [
            user.customer_id, 
            user.amount,
            user.date
        ]);

        // before returning money needs to be added to the user's account
        return true;
    },

    payLoan: async function(user) {
        const [result, schema] = await db.promise().query("SELECT * FROM loan WHERE customer_id = ? AND loan_id = ?;", 
        [
            user.customer_id, 
            user.loan_id
        ])

        if(result.length > 0){ 
            const [result, schema] = await db.promise().query("UPDATE loan SET loan_amount = loan_amount - ? WHERE loan_id = ?", 
            [
                user.amount,
                user.loan_id
            ])
            console.log(result);
        }

    },

    getLoans: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM loan WHERE customer_id = ?", [user.customer_id]);
        return result;
    }

}

module.exports = loan;