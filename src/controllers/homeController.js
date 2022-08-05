const router = require('express').Router();
const authService = require('../services/authService')

const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

const SECRET = '471fec40c34d63b90e8f66164bd465cd955630a1';



const renderHome = async (req, res) => {
    res.render('index');
}

const renderRegister = (req, res) => {
    res.render('register');
}

const renderLogin = (req, res) => {
    res.render('login');
}

const login = (req, res) => {
    const { username, password } = req.body;

    jwt.sign({ id: uniqid(), username, password }, SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            return res.status(400)
                .send(err);
        }

        res.redirect('/');
    });
}

const register = async (req, res) => {
    console.log(req.body);
    const { username, password, rePass } = req.body;



    try {
        let user = await authService.register(username, password);

        jwt.sign({ id: user.id, username, password }, SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(400).send(err);
            }

            res.cookie('jwt', token);

            res.redirect('/');
        });

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