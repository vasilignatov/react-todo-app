const router = require('express').Router();
const taskService = require('../services/taskService');


const renderApp = async (req, res) => {
    let tasks = await taskService.getAll();

    res.render('app', {
        opened: tasks.opened,
        closed: tasks.closed,
        'in-progress': tasks['in-progress']
    });
}

const createTask = async (req, res) => {
    let task = req.body;
    console.log(task);
}

const renderCreate = (req, res) => {
    res.render('create');
}



router.get('/', renderApp);
router.get('/create', renderCreate);
router.post('/create', createTask);


module.exports = router;
