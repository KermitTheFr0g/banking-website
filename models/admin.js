const db = require('../database');

var admin = {
    getAllLoans: async function(){
        const [result, schema] = db.promise().query('SELECT * FROM loan INNER JOIN customer ON loan.customer_id = customer.customer_id');

        return result
    }
}

module.exports = admin;