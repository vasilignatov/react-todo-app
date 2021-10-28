import { createGuestApp, showGuestApp } from './guestApp.js';

let main;
let section;

export function createInfo(mainTarget, sectionTarget, appSection) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector('#guestsBtn').addEventListener('click', (ev) => { //change views and add event listener to handle guest tasks;
        ev.preventDefault();
        createGuestApp(main, appSection);
        showGuestApp();
    });
}

export function showInfo() {
    main.innerHTML = '';
    main.appendChild(section);
}