import { useState, useEffect } from 'react';
import TodoItem from '../todoItem/TodoItem.js'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../../services/todoService.js'

export default function Main() {
    const [todos, setTodos] = useState([]);
    console.log(todos);
    useEffect(() => {
        getTodos().then(data => setTodos(data));
    }, []);

    const onCreate = async (e) => {
        const input = e.target.parentElement.querySelector('input');

        if (input.value == '') return;

        await createTodo({ text: input.value })
        const newState = await getTodos();
        setTodos(newState);
        input.value = '';
    }

    return (
        <main className="app__main">
            <div className="todo__input">
                <label htmlFor="create-todo">Todo: </label>
                <input type="text" id="create-todo" name="create-todo" />
                <button onClick={onCreate}>Add</button>
            </div>

            <div className="todo__list">
                <ul>
                    {todos.map(todo => <TodoItem todo={todo} />)}
                    {todos.map(todo =>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={onDelete}
                        />)}
                </ul>
            </div>
        </main>
    );
}