const db = require('./database');
//const user = require('./models/user');

async function findUser(custID){
    const response = db.promise().query("SELECT * FROM customer WHERE customer_id = " + custID);

    return response[0];
}


var user = {
    checkIfUserExists: async function(newUser){
        const [result, schema] = await db.promise().query("SELECT COUNT(customer_id) FROM customer WHERE username = ?", [newUser.username]);
        let usernames = result[0]["COUNT(customer_id)"]; 
        return usernames > 0
    },

    checkIfEmailExists: async function(newUser){
        const [result, schema] = await db.promise().query("SELECT COUNT(customer_id) FROM customer WHERE email = ?", [newUser.email]);
        let emails = result[0]["COUNT(customer_id)"]; 
        return emails > 0
    }
}


async function checkUsers(){
    console.log(await user.checkIfUserExists("kermit"))
    console.log(await user.checkIfEmailExists("user@gmail.com"));
}

checkUsers();
