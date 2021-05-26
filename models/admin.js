const db = require('../database');

var admin = {
    getLoans: async function(){
        
        // getting all loans 
        const [result, schema] = await db.promise().query('SELECT * FROM loan');
        
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