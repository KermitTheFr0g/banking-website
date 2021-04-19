const joi = require("joi");
const { login } = require("../models/user");

const loginSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required(),
    password: joi.string()
        .alphanum()
        .min(11)
        .max(30)
        .required()
});  

const signupSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required(),

    password: joi.string()
        .alphanum()
        .min(11)
        .max(30)
        .required(),
    
    email: joi.string()
        .email()
        .required(),

    firstName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    dob: joi.date()
        .max("now")
});


var validation = {
    login: function(user){
        const loginValidation = loginSchema.validate({
            username: user.username,
            password: user.password
        })

        if(!loginValidation.error){
            return;
        } else {
            return loginValidation.error;
        }
    },

    signup: function(newUser){
        const signupValidation = signupSchema.validate({
            username: newUser.username,
            password: newUser.password,
            email: newUser.email,
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            dob: newUser.dob
        })
        
        if(!signupValidation.error){
            return;
        }else {
            return signupValidation.error;
        }

    }
}

module.exports = validation