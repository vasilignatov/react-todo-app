const router = require('express').Router();
const taskService = require('../services/taskService');

const renderHome = async (req, res) => {
    res.render('index');
}

const renderApp = async (req, res) => {
    let tasks = await taskService.getAll();
    
    res.render('app', { 
        opened: tasks.opened, 
        closed: tasks.closed, 
        'in-progress': tasks['in-progress'] 
    });
}

router.get('/', renderHome);
router.get('/app', renderApp);


module.exports = router;