const User = require('../model/User');
const bcrypt = require('bcrypt');


// const { SECRET } = require('../constants');

exports.register = function (username, password, rePass) {

    if (password != rePass) {
        throw { message: 'Passwords don`t match!' }
    }

    return bcrypt.hash(password, 9)
        .then(hash => User.create({ username, password: hash }));

}

// exports.register = function
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


