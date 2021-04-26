const db = require('../database');

var admin = {
    getLoans: async function(){
        //const [result, schema] = db.promise().query('SELECT customer.first_name, customer.last_name, loan.loan_amount, loan.loan_apr, loan.loan_id, loan.date_created FROM loan INNER JOIN customer ON loan.customer_id = customer.customer_id');
        let customer = db.promise().query('SELECT * FROM customer');


        return customer;
    }
    
}

module.exports = admin;