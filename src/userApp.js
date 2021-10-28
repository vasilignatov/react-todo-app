import { e, getInputData} from './dom.js';

export function renderData(data) { // processes and renders data
    const inProgressDiv = document.getElementById('inProgressTasks');
    const completedTasksDiv = document.getElementById('completedTasks');

    inProgressDiv.innerHTML = '';
    completedTasksDiv.innerHTML = '';

    data.inProgressTasks
        .filter(x => x != undefined)
        .map(x => e('div', { className: 'task' }, x))
        .forEach(t => inProgressDiv.appendChild(t))

    data.completedTasks
        .filter(x => x != undefined)
        .map(x => e('div', { className: 'task' }, x))
        .forEach(t => completedTasksDiv.appendChild(t))
}

async function getDataForUser() {
    const objectId = sessionStorage.getItem('objectId');

    const response = await fetch(`https://parseapi.back4app.com/classes/myApp/`, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
            'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
        }
    });

    if (!response.ok) {
        const err = await response.json();
        return console.error(err.error);
    }

    const data = await response.json();

    const dataId = Object.values(data)[0].reduce((acc, c) => {
        acc[c.userId] = c;
        return acc;
    }, {});

    const userData = Object.entries(dataId)
        .filter(x => x[0] == objectId)[0]
        .reduce((acc, c) => typeof c == 'object' ? acc[c] = c : acc, {});

    return userData;
}

async function sendData(data, id) {
    const response = await fetch(`https://parseapi.back4app.com/classes/myApp/${id}`, {
        method: 'put',
        headers: {
            'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
            'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    if (!response.ok) {
        const message = await response.json();
        return console.log(message)
    }
    const result = await response.json();
    console.log(result);
}

let main;
let section;    

export function createApp(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export function showApp() {
    main.innerHTML = '';
    main.appendChild(section);

}

// if (event.target.id == 'submit') {
//     event.preventDefault();
//     // get data from input form
//     const inputData = getInputData();

//     if (inputData) {
//         userData.inProgressTasks.unshift(inputData);

//         sendData({ 'inProgressTasks': userData.inProgressTasks }, userData.objectId);
//         renderData(userData);
//     }


// } else if (event.target.parentElement.id == 'inProgressTasks') {
//     // move current task and calls render all task;
//     const el = userData.inProgressTasks.splice(userData.inProgressTasks.indexOf(event.target.textContent), 1)[0];
//     userData.completedTasks.unshift(el);

//     sendData({ 'inProgressTasks': userData.inProgressTasks }, userData.objectId)
//     sendData({ 'completedTasks': userData.completedTasks }, userData.objectId)
//     renderData(userData);


// } else if (event.target.parentElement.id == 'completedTasks') {
//     // delte current task and calls render all task;
//     userData.completedTasks.splice(userData.completedTasks.indexOf(event.target.textContent), 1);
//     sendData({ 'completedTasks': userData.completedTasks }, userData.objectId);
//     renderData(userData);
// }