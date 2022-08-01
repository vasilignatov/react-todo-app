const router = require("express").Router();
const homeController = require('./controllers/homeController');
const appController = require('./controllers/appController');


router.use(homeController);
router.use('/app', appController)


module.exports = router;
