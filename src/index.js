const path = require('path');
const express = require('express');
const initHandlebars = require('./config/handlebars');

const app = express();

app.use(express.urlencoded({extended: true}));
// parse data from formdata

initHandlebars(app);
// init template engine




app.listen(5000, console.log.bind(console, 'App is running on port 5000'));
