import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { applicationPage } from './views/guestApp.js';

const main = document.querySelector('main');

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/task-manager', decorateContext, applicationPage);
page.start();



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    // implement user nav setup function
    next();
}


// const views = [...document.getElementById('views').children].reduce((acc, c) => {
//     acc[c.id] = c;
//     return acc;
// }, {});


// createLogin(main, views.loginView, () => { setUserNav, showApp });
// createRegister(main, views.registerView, () => { setUserNav, showApp });
// createInfo(main, views.infoView, views.appView);
// createApp(main, views.appView);

// setupNavigation();
// setUserNav();             // check for token and set navigation;

function setupNavigation() {
    document.querySelector('nav').addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const view = links[event.target.id];
            if (typeof view == 'function') {
                event.preventDefault();
                view();
            }
        }
    });
}

function setUserNav() {
    if (sessionStorage.getItem('sessionToken')) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
        // document.querySelector('#logout').addEventListener('click', logout);
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('user').style.display = 'none';
        showInfo(); // starting info view
    }
}

// function logout() { //clear session storage and send request to the user;
//     sessionStorage.clear();
//     console.log('logout');
//     setUserNav();
//     showInfo();
// }

