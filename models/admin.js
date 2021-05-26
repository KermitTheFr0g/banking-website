const db = require('../database');

var admin = {
    getLoans: async function(){
        
        // getting all loans 
        // getting info from two tables loan and customer
        var [result, schema] = await db.promise().query('SELECT loan_amount, first_name, last_name, date_created FROM loan, customer');
        // gets a sum of all of the loans using sql query
        let totalLoanAmount = await db.promise().query('SELECT SUM(loan_amount) AS total FROM loan');

        totalLoanAmount = totalLoanAmount[0][0].total;

        return {
            totalLoanAmount: totalLoanAmount, 
            allLoans: result
        }
    },

    getBalances: async function(){
        var [result, schema] = await db.promise().query('SELECT balance, first_name, last_name FROM ACCOUNT INNER JOIN customer ON ACCOUNT.customer_id = CUSTOMER.customer_id;');

        let totalBalanceAmount = await db.promise().query('SELECT SUM(balance) AS total FROM account');

        totalBalanceAmount = totalBalanceAmount[0][0].total;

        return {
            totalBalanceAmount: totalBalanceAmount,
            allAccounts: result
        }
    }
}

module.exports = admin;