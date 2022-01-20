import { html } from '../../node_modules/lit-html/lit-html.js';

const loginTemplate = () => html`
            <div id="loginView">
            
                <h2>Log in</h2>
                <form method="GET">
                    <label>Username:<input type="text" name="username"></label>
                    <label>Password:<input type="password" name="password"></label>
                    <input type="submit" value="Log In">
                </form>
            </div>
`

export async function loginPage(ctx) {
    ctx.render(loginTemplate());
}
// export function createLogin(mainTarget, sectionTarget, onSuccessTarget) {
//     main = mainTarget;
//     section = sectionTarget;
//     onSuccess = onSuccessTarget;
//     section.querySelector('form').addEventListener('submit', onLoginSubmit);
//     async function onLoginSubmit(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);

//         const username = formData.get('username');
//         const password = formData.get('password');

//         if (username == '' || password == '') {
//             return alert('All fields are required!');
//         }

//         const url = `https://parseapi.back4app.com/login?username=${username}&password=${password}`;
//         const response = await fetch(url, {
//             method: 'get',
//             headers: {
//                 'X-Parse-Application-Id': 'fvK5bAFbe3JkiKNkxaZv1YAeKciGsRDFJMieWfFa',
//                 'X-Parse-REST-API-Key': 'N1wMpHUdpJ9ZmTzzzyyrhsYwwxRLurxgNgU0SaWo',
//                 'X-Parse-Revocable-Session': 1,
//             }
//         });

//         if (!response.ok) {
//             const err = await response.json();
//             return alert(err.error);
//         }

//         const result = await response.json();

//         sessionStorage.setItem('sessionToken', result.sessionToken);
//         sessionStorage.setItem('objectId', result.objectId);

//         showApp();
//     }
// }


