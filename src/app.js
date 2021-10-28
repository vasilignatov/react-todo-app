// import { getInputData } from './dom.js';
import { createLogin, showLogin } from './login.js';
import { createRegister, showRegister } from './register.js';
import { createApp, showApp, renderData } from './userApp.js';
// import { createGuestApp, showGuestApp } from './guestApp.js';
import { createInfo, showInfo } from './info.js';


const main = document.querySelector('main');
const views = [...document.getElementById('views').children].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});
console.log(views);
const links = {
    'loginLink': showLogin,
    'registerLink': showRegister,
}

createLogin(main, views.loginView, () => {setUserNav, showLogin()});
createRegister(main, views.registerView, () => {setUserNav, showRegister()});
createInfo(main, views.infoView, views.appView);
createApp(main, views.appView);

setupNavigation();
setUserNav();             // check for token and set navigation;

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
        console.log(document.querySelector('#logout'));
        document.querySelector('#logout').addEventListener('click', logout);
        showApp();
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('user').style.display = 'none';
        showInfo();
    }
}

function logout() { //clear session storage and send request to the user;
    sessionStorage.clear();
    setUserNav();
    showInfo();
}

