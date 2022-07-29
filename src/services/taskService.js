const Task = require('../model/Task');

const create = (name, description, priority, state) => {
    return Task.create({ name, description, priority, state })
}

const getAll = async () => {
    let tasks = await Task.find({}).lean();
    
    return tasks.reduce((acc, c) => {
        if (!acc[c.state]) {
            acc[c.state] = [];
        }
        acc[c.state].push(c);
        return acc;
    }, {});
}



module.exports = {
    create,
    getAll
}

