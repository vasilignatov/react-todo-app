const path = require('path');
const handlebars = require('express-handlebars');


const initHandlebars = (app) => {

    app.set('views', path.resolve(__dirname, '../views'));

    app.set('view engine', 'hbs');

    app.engine('hbs', handlebars.engine({
        extname: '.hbs',
        layoutsDir: 'main'
    }));
}

module.exports = initHandlebars;