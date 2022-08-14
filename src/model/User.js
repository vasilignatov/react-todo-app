const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minleght: [3, 'Username must be more than 3 chars!']
    },
    password: {
        type: String,
        required: true,
        minleght: [6, 'Password must be more than 6 chars!']
    }
});


userSchema.static('findByUsername',function(username) {
    return this.findOne({username});
});


userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 9)
        .then(hash => {
            this.password = hash;
            next();
        });
});


let User = mongoose.model('User', userSchema);

module.exports = User;