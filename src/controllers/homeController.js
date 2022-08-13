const router = require('express').Router();

const renderHome = async (req, res) => {
    res.render('index');
}

router.get('/', renderHome);

module.exports = router;