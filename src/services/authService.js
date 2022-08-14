const User = require('../model/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtUtils');
const { SECRET } = require('../constants');
exports.register = function (username, password, rePass) {

    if (password != rePass) {
        throw { message: 'Passwords don`t match!' }
    }

    return User.create({ username, password });

}

exports.login = async function (username, password) {
    let user = await User.findByUsername(username);
    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        return user;
    } else {
        throw { message: 'Cannot find username or password!' }
    }
}

exports.createToken = function (user) {
    let payload = {
        _id: user._id,
        username: user.username
    }

    return jwtSign(payload, SECRET);
}


