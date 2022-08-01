const path = require('path');
const express = require('express');
const initHandlebars = require('./config/handlebars');
const initDatabase = require('./config/database');
const routes = require('./routes');

const connetionString = 'mongodb://localhost:27017/ToDoApp';


const app = express();

app.use(express.urlencoded({ extended: true }));
// parse data from formdata

initHandlebars(app);
// init template engine

app.use(express.static(path.resolve(__dirname, './public')));

app.use(routes);

initDatabase(connetionString)
    .then( () => {
        app.listen(5001, console.log.bind(console, `App is running on port http://localhost:5001`));
    })
    .catch(err => {
        console.log(err);
    });

    