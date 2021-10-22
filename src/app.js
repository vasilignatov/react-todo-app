
main();

async function main() {
    const infoView = document.getElementById('info');
    const app = document.getElementById('app');

    const token = sessionStorage.getItem('sessionToken')
    if (token) {
        //change the view
        infoView.style.display = 'none';    
        app.style.display = 'block';
        //change navigation bar 
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';

        let userData = await getDataForUser();
        // render tasks for logged user
        renderData(userData);

        // process click event(over task) or get data from input form;
        app.addEventListener('click', (event) => {
            if (event.target.id == 'submit') {
                event.preventDefault();
                // get data from input form
                const inputData = getInputData();

                if (inputData) {
                    userData.inProgressTasks.unshift(inputData);

                    sendData({ 'inProgressTasks': userData.inProgressTasks }, userData.objectId);
                    renderData(userData);
                }


            } else if (event.target.parentElement.id == 'inProgressTasks') {
                // move current task and calls render all task;

                const el = userData.inProgressTasks.splice(userData.inProgressTasks.indexOf(event.target.textContent), 1)[0];
                userData.completedTasks.unshift(el);
                
                sendData({ 'inProgressTasks': userData.inProgressTasks }, userData.objectId)
                sendData({ 'completedTasks': userData.completedTasks }, userData.objectId)
                renderData(userData);
                
                
            } else if (event.target.parentElement.id == 'completedTasks') {
                // delte current task and calls render all task;
                
                userData.completedTasks.splice(userData.completedTasks.indexOf(event.target.textContent), 1);
                sendData({ 'completedTasks': userData.completedTasks }, userData.objectId);
                renderData(userData);
                
            }
        });

        document.getElementById('logoutBtn').addEventListener('click', logout);

    } else { // implement static app functionaliti
        document.getElementById('guestsBtn').addEventListener('click', (event) => { //change views and add event listener to handle guest tasks;
            event.preventDefault();

            infoView.style.display = 'none';
            app.style.display = 'block';

            document.getElementById('submit').addEventListener('click', guestTasksHandler);
        });
    }
}

function getInputData() { // get input value, clear input field
    const taskField = document.getElementById('task');

    if (taskField.value.trim() == '') {
        return alert('You can\`t crate empty task!');
    }
    const task = taskField.value;
    taskField.value = '';

    return task;
}

function logout() { //clear session storage and send request to the user;
    sessionStorage.clear();
    window.location.pathname = 'index.html';
}

function renderData(data) { // receives data and renders it
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

// async function getDataForObjectId(id) {

// }



