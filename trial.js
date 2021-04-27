const db = require('./database');
const user = require('./models/user');

async function findUser(custID){
    const response = db.promise().query("SELECT * FROM customer WHERE customer_id = " + custID);

    return response[0];
}

return res.send(findUser('100 OR 1 = 1'));


console.log(response);