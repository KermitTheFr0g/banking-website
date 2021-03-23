const db = require("../database");
const bcrypt = require("bcrypt");

var User = {
    checkIfUserExists: function(newUser, callback) {

        var sql = format("SELECT * FROM customer WHERE username = '{username}';", {
            username: newUser.username
        });

        db.query(sql, (err, result) => {
            if(err){
                throw err
            }

            callback(result.length > 0);
        });    
    },

    checkIfEmailExists: function(newUser, callback) {
        var sql = format("SELECT * FROM customer WHERE email = '{email}';", {
            email: newUser.email
        });


        db.query(sql, (err, result) => {
            if(err){
                throw err;
            }

            callback(result.length > 0);
        })
    },

    createNewUser: function(newUser, callback){
        var sql = format('INSERT INTO customer (username, email, password, first_name, last_name, dob)' +
        'VALUES  ("{username}", "{email}", "{password}", "{firstName}", "{lastName}", "{dob}");', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            dob: newUser.dob
            }
        )

        db.query(sql , function(err, result){
            if(err){
                throw err;
           }

           callback(true);
        })

    },

    hashPassword: function(password) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }    
}
module.exports = User;