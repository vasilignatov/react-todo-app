const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minleght: [3, 'Username must be more than 3 chars!']
    },
    password: {
        type: String,
        required: true,
        minleght: [6, 'Password must be more than 6 chars']
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;