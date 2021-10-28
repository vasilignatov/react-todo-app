async function onLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get('username');
    const password = formData.get('password');

    if (username == '' || password == '') {
        return alert('All fields are required!');
    }

    const url = `https://parseapi.back4app.com/login?username=${username}&password=${password}`;
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
            'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
            'X-Parse-Revocable-Session': 1,
        }
    });
    
    if(!response.ok) {
        const err = await response.json();
        return alert(err.error);
    }

    const result = await response.json();
    
    sessionStorage.setItem('sessionToken', result.sessionToken);
    sessionStorage.setItem('objectId', result.objectId);
}

let main;
let section;
let onSuccess;

export function createLogin(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSuccess = onSuccessTarget;
    section.querySelector('form').addEventListener('submit', onLoginSubmit);
}

export function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}