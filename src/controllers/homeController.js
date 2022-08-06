const router = require('express').Router();
const authService = require('../services/authService')

const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

const { SECRET } = reqire('../contains');

const renderHome = async (req, res) => {
    res.render('index');
}

const renderRegister = (req, res) => {
    res.render('register');
}

const renderLogin = (req, res) => {
    res.render('login');
}

const login = async (req, res) => {
    const { username, password } = req.body;

    const isValid = await authService.login(username, password);
    try {

        if (isValid) {

            const user = await authService.getUser(username);

            jwt.sign({ id: user.id, username, password }, SECRET, { expiresIn: '1d' }, (err, token) => {
                // create a jwt

                if (err) {
                    return res.status(400).send(err);
                }

                res.cookie('jwt', token);
                // send token to user

                res.redirect('/');
            });
        } else {
            res.status(401).send('Canno`t login!')
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
}

const register = async (req, res) => {
    let { username, password, rePass } = req.body;

    if (password != rePass) {
        return res.send('Passwords don`t match!');
    }

    try {
        await authService.register(username, password);
        // return user with hashed password

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
}

router.get('/', renderHome);
router.get('/login', renderLogin);
router.post('/login', login);
router.get('/register', renderRegister);
router.post('/register', register);

module.exports = router;