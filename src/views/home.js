import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
        <div id="infoView">
        
            <h1> Welcome to ToDo Manager</h1>
            <p>Why to use it: </p>
            <li> Improving Task & Time Management </li>
            <li> To use the full potential of the app, you must be register</li>
            <li> When you are logged in your task will be saved <br> and you
                can easly manage it</li>
            <li> It is FREE</li>
        
            <button id="guestsBtn" @click=${onClick}>Use like guest</button>
        
        </div>
`

// section.querySelector('#guestsBtn').addEventListener('click', (ev) => { //change views and add event listener to handle guest tasks;
//     ev.preventDefault();
//     createGuestApp(main, appSection);
//     showGuestApp();
// });
export async function homePage(ctx) {
    ctx.render(homeTemplate()); 
}

async function onClick() {
    console.log('guest app');
}
