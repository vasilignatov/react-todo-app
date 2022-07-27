const path = require('path');
const express = require('express');
const initHandlebars = require('./config/handlebars');

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
// parse data from formdata

initHandlebars(app);
// init template engine

app.use(express.static(path.resolve(__dirname, './public')));

app.use(routes);


app.listen(5001, console.log.bind(console, `App is running on port http://localhost:5001`));
