const db = require("../database");
const bcrypt = require("bcrypt");

var User = {
    checkIfUserExists: async function(newUser){
        const [result, schema] = await db.promise().query("SELECT * FROM customer WHERE username = ?", [newUser.username]);
        if(result.length > 0){
            return true;
        }
    },

    checkIfEmailExists: async function(newUser){
        const [result, schema] = await db.promise().query("SELECT * FROM customer WHERE email = ?", [newUser.email]);
        if(result.length > 0){
            return true;
        }
    },

    createUser: async function(newUser){
        const [result, schema] = await db.promise().query("INSERT INTO customer (username, email, password, first_name, last_name, dob) VALUES (?, ? , ?, ?, ?, ?)", 
            [
                newUser.username,
                newUser.email,
                newUser.password,
                newUser.first_name,
                newUser.last_name,
                newUser.dob
            ]

        );
        if(result.affectedRows == 1){
            return true;
        }
    },

    hashPassword: function(password) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }    
}
module.exports = User;