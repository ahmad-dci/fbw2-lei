const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
            bcrypt.hash(password, 10, (err, hashedPass) =>{
                if (!err) {
                    const newUser = new Users({
                        firstName: fname,
                        lastName: lname,
                        userName: username,
                        email,        //email: email
                        password: hashedPass
                    });
                    newUser.save().then(result => {
                        resolve(result);
                    }).catch(error => {
                        reject(error)
                    })
                } else{
                    reject(new Error('can not hash the password'))
                }
                
            })
            
        }).catch(error => {
            reject(error)
        })
    })
}

function checkUser(username, password) {
    // errors map
    // 3 server error
    // 4 not match
    // 5 user not found
    return new Promise((resolve, reject) => {
        connect().then(() => {
            Users.findOne({userName: username}).then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            reject(3);
                        } else {
                            if (result) {
                                resolve();
                            } else {
                                reject(4);
                            }
                        }
                    })
                } else {
                    reject(5);
                }
            }).catch(error => {
                reject(3);
            })
        }).catch(error => {
            reject(3);
        })
        
    })
}

module.exports = {
    registerUser,
    checkUser
}