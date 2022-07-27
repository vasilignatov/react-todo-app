const res = require("express/lib/response");

const router = require("express").Router();

const homeController = require('./controllers/home');


const renderRegister = (req, res) => {
    res.render('register');
}

const renderLogin = (req, res) => {
    res.render('login');
}

router.use('/', homeController);
router.use('/login', renderLogin);
router.use('/register', renderRegister);


module.exports = router;
