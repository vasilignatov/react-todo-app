import { useState, useEffect } from 'react';
import TodoItem from '../todoItem/TodoItem.js'

const API_URL = 'http://localhost:3040/todos/';

export default function Main() {

    const [todos, setTodos] = useState([]);
    
    // useEffect(() => {
    // }, [])
    
    fetch(API_URL)
        .then(response => response.json())
        .then(todos => setTodos(todos))
        .catch(err => console.error(err));

    console.log(todos);
    
    return (
        <main className="app__main">
            <div className="todo__input">
                <label htmlFor="create-todo">Todo: </label>
                <input type="text" id="create-todo" name="create-todo" />
                <button>Add</button>
            </div>

            <div className="todo__list">
                <ul>
                    {todos.map(todo => <TodoItem todo={todo} />)}
                </ul>
            </div>
        </main>
    )
}