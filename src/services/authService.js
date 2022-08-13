const User = require('../model/User');


// const { SECRET } = require('../constants');

exports.register = function (username, password, rePass) {

    if (password != rePass) {
        throw { message: 'Passwords don`t match!' }
    }

    return User.create({ username, password});

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


