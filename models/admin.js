const db = require('../database');

var admin = {
    getLoans: async function(){
        
        // getting all loans 
        // getting info from two tables loan and customer
        const [result, schema] = await db.promise().query('SELECT loan_amount, first_name, last_name, date_created FROM loan, customer');
        // gets a sum of all of the loans using sql query
        let totalLoanAmount = await db.promise().query('SELECT SUM(loan_amount) AS total FROM loan');

        totalLoanAmount = totalLoanAmount[0][0].total;

        /*
        var totalAmount = 0;
        var i;
        for(i = 0; i < result.length; i++){
            totalAmount += parseFloat(result[i].loan_amount);
        }
        */

        return {
            totalLoanAmount: totalLoanAmount, 
            allLoans: result
        }
    }
}

module.exports = admin;