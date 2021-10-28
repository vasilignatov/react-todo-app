import { getInputData } from './dom.js';

let main;
let section;


export function createGuestApp(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    section.querySelector('#submit').addEventListener('click', guestTasksHandler);
}

export function showGuestApp() {
    main.innerHTML = '';
    main.appendChild(section);
}

function guestTasksHandler(event) { //add event listeners to procesing tasks
    event.preventDefault();
    const inProgressTasks = document.getElementById('inProgressTasks');
    const completedTasks = document.getElementById('completedTasks');
    const newTask = `<div class="task">${getInputData()}</div>`
    inProgressTasks.innerHTML += newTask;

    inProgressTasks.addEventListener('click', completeTask);
    completedTasks.addEventListener('click', detleteTask);

    function completeTask(ev) {
        ev.stopImmediatePropagation();
        if (ev.target.classList.contains('task') && ev.target.tagName == 'DIV') {
            completedTasks.prepend(ev.target);
        }
    }
    function detleteTask(ev) {
        ev.stopImmediatePropagation();
        if (ev.target.classList.contains('task') && ev.target.tagName == 'DIV') {
            ev.target.parentNode.removeChild(ev.target);
        }
    }

}
    

