const db = require('./database');

async function getCount(){
    let [result, schema] = await db.promise().query('SELECT COUNT(customer_id) FROM customer');

    console.log(result[0]["COUNT(customer_id)"]);
}


getCount();