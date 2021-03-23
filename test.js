const db = require("./database");


async function pog(){
    const [results, schema] = await db.promise().query("SELECT * FROM customer");
    console.table(results);
}


pog();