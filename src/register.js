
async function onRegisterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repass');

    if (username == '' || email == '' || password == '' || repass == '') {
        return alert('All fields are required!');
    } else if (password !== repass) {
        return alert('Passwords do not mach!');
    }


    const response = await fetch('https://parseapi.back4app.com/users', {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
            'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
            'X-Parse-Revocable-Session': 1,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
        const err = await response.json();
        return alert(err.error)
    }

    const result = await response.json();
    
    sessionStorage.setItem('authToken', result.sessionToken);
    sessionStorage.setItem('objectId', result.objectId);
}

export async function createNewUserStorage() {
    const response = await fetch('https://parseapi.back4app.com/classes/myApp', {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
            'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "inProgressTasks": [
                    "new tasks are updated",
                    "dfcvacvcv csdf"
                ]
            })
    });

    if (!response.ok) {
        const err = await response.json();
        return alert(err.error)
    }
}

let main;
let section;

export function createRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);

    document.querySelector('form').addEventListener('submit', onRegisterSubmit);
    
}