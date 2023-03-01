const API_URL = 'http://localhost:3040/todos/';

export async function getTodos() {
    try {
        return await (await fetch(API_URL)).json();
    } catch (error) {
        return { message: error }
    }
}

export async function createTodo(todo) {
    try {
        return await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
    } catch (error) {
        return { message: error }
    }
}

export async function deleteTodo(id) {
    try {
        return await fetch(API_URL + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return { message: error }
    }
}
export async function updateTodo(todo) {
    try {
        return await fetch(API_URL + todo.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    } catch (error) {
        return { message: error }
    }
}


