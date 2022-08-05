const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const users = [];

function register(username, password) {

    
    if (users.some(x => x.username == username)) {
        throw { message: 'User already registered!' };
    }
    
    bcrypt.hash(password, 9)
    .then(hash => {
        let user = { id: uniqid(), username, password: hash };
        users.push(user);
        return user;
    });
}

const authService = {
    register
};

module.exports = authService;

 