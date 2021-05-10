const db = require('../database');

var admin = {
    getLoans: async function(){
        // getting all loans 
        // getting info from two tables loan and customer
        const [result, schema] = await db.promise().query('SELECT SUM(loan_amount) AS total_amount, first_name, last_name, date_created FROM loan, customer');
        
        return result


        var totalAmount = 0;
        var i;
        for(i = 0; i < result.length; i++){
            totalAmount += parseFloat(result[i].loan_amount);
        }

        return {
            totalLoanAmount: totalAmount, 
            allLoans: result
        }
    }
    
}

module.exports = admin;