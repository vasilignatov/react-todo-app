const PORT = 3040;

const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');
const data = require('./data.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// CRUD

app.get('/todos', (req, res) => {
    try {
        res.json(data);
    } catch (error) {
        res.json({
            message: error,
            status: 404
        })
    }
});

app.post('/todos', async (req, res) => {
    const { text } = req.body;

    const result = {
        id: uniqid(),
        isDone: false,
        text
    };

    try {
        data.push(result);
        res.status(201).json(result);
    } catch (error) {
        res.json({
            message: error
        });
    }

});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = data.findIndex(x => x.id == id)
    data.splice(todoIndex, 1);

    res.status(204).json({message: 'Resource deleted successfully!'})
});

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;

    const todoIndex = data.findIndex(x => x.id == id);
    data[todoIndex] = updatedTodo;

    res.status(200).json({message: 'Resource updated successfully'})
});



app.get('*', (req, res) => {
    res.status(404).json({
        message: 'This resource doesn\'t exist!'
    });
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));