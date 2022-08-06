const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const users = [];

const { SECRET } = require('../constants');

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

function login(username, password) {

    let user = users.find(x => x.username == username);

    if (!user) {
        throw { message: 'Username or password is wrong!' };
    }

    return bcrypt.compare(password, user.password);
}

function getUser(username) {

    let user = users.find(x => x.username == username);

    return user;
}



const authService = {
    register,
    login,
    getUser
};

module.exports = authService;

