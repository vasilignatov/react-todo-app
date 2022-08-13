const router = require("express").Router();
const homeController = require('./controllers/homeController');
const appController = require('./controllers/appController');
const authController = require('./controllers/authController');

router.use(homeController);
router.use(authController)
router.use('/app', appController)

module.exports = router;
