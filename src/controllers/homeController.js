const router = require('express').Router();
const jwt = require('jsonwebtoken');


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
    const {username, password} = req.body;

    const token = jwt.sign({username, password}, )

    res.redirect('/');
}

router.get('/', renderHome);
router.get('/login', renderLogin);
router.post('/login', login);
router.get('/register', renderRegister);

module.exports = router;