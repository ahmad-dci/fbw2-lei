const mongoose = require('mongoose');
// get connectionstring from mongodbatlas
const connectionString = 'mongodb+srv://fbw2lei:!234qweR@cluster0.rmrmn.mongodb.net/fbw2lei?retryWrites=true&w=majority'

// create the schema for user
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// create the mongoose model to be connected the userSchema with [users] collection

const Users = mongoose.model('users', usersSchema);


function connect() {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            resolve();
        } else {
            mongoose.connect(connectionString, {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            }).then(() => {
                resolve();
            }).catch(error => {
                reject(error)
            })
        }
    })
}

function registerUser(fname, lname, username, email, password) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            const newUser = new Users({
                firstName: fname,
                lastName: lname,
                userName: username,
                email,        //email: email
                password
            });
            newUser.save().then(result => {
                resolve(result);
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    registerUser
}