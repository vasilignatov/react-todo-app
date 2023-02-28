const PORT = 3040;

const express = require('express');
const uniqid = require('uniqid');
const data = require('./data.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(data);

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

});

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'This resource doesn\'t exist!'
    });
}) 

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));