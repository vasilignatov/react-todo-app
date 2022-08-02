const uniqid = require('uniqid');
const users = [];

function register(username, password) {
    if (users.some(x => x.username == username)) {
        throw { message: 'User already registered!' };
    }

    let user = { id: uniqid(), username, password };

    users.push(user);

    return user;
}

const authService = {
    register
};

module.exports = authService;

 