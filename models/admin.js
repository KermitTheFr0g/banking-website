const db = require('../database');

var admin = {
    getLoans: async function(){
        
        // getting all loans 
        // getting info from two tables loan and customer
        var [result, schema] = await db.promise().query('SELECT loan_amount, first_name, last_name, date_created FROM loan, customer');
        // gets a sum of all of the loans using sql query
        let totalLoanAmount = await db.promise().query('SELECT SUM(loan_amount) AS total FROM loan');

        totalLoanAmount = totalLoanAmount[0][0].total;

        // getting data from two different tables using an innser join
        // getting all loans
        var [result, schema] = await db.promise().query('SELECT loan_amount, first_name, last_name, date_created FROM loan INNER JOIN CUSTOMER ON loan.customer_id = customer.customer_id;')



        return {
            totalLoanAmount: totalLoanAmount, 
            allLoans: result
        }
    }
}

module.exports = admin;