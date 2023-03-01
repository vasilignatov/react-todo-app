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

    const onDelete = async (todoId) => {
        await deleteTodo(todoId);
        const newState = await getTodos();

        setTodos(newState);
    }

    const onFinish = async (todo) => {
        const editedTodo = JSON.parse(JSON.stringify(todo));
        editedTodo.isDone = !editedTodo.isDone;

        await updateTodo(editedTodo);

        const updatedTodos = await getTodos();
        console.log('->', updatedTodos);
        setTodos(updatedTodos);
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
                    {todos.map(todo =>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={onDelete}
                            onFinish={onFinish}
                        />)}
                </ul>
            </div>
        </main>
    );
}