const router = require('express').Router();

const renderHome = async (req, res) => {
    res.render('index');
}

const renderRegister = (req, res) => {
    res.render('register');
}

const renderLogin = (req, res) => {
    res.render('login');
}

router.get('/', renderHome);
router.get('/login', renderLogin);
router.get('/register', renderRegister);

module.exports = router;