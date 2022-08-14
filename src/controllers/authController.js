const router = require('express').Router();
const authService = require('../services/authService');


const renderRegister = (req, res) => {
    res.render('register');
}

const renderLogin = (req, res) => {
    res.render('login');
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await authService.login(username, password);

        if (!user) {
            return res.redirect('/register');
        }

        let token = await authService.createToken(user);

        res.cookie('app_token', token, {
            httpOnly: true
        });

        res.redirect('/');

    } catch (error) {
        res.status(401).send(error.message);
    }
}

const register = async (req, res) => {
    let { username, password, rePass } = req.body;

    try {
        await authService.register(username, password, rePass);
        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



router.get('/login', renderLogin);
router.post('/login', login);

router.get('/register', renderRegister);
router.post('/register', register);

module.exports = router;