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

    payLoan: function(user) {

    },

    getLoans: async function(user){
        const [result, schema] = await db.promise().query("SELECT * FROM loan WHERE customer_id = ?", [user.customer_id]);
        return result;
    }

}

module.exports = loan;