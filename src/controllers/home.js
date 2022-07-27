const router = require('express').Router();

const renderHome = async (req, res) => {
    res.render('index');
}

const renderApp = (req, res) => {
    res.render('app');
}

router.get('/', renderHome);
router.get('/app', renderApp)

module.exports = router;