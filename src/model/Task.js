const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 35
    },
    description: {
        type: String,
        reqired: true,
        minLength: 5,
        maxLength: 150
    },
    priority: [String],
    status: [String]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;