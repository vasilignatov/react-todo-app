export default function TodoItem({
    todo,
    onDelete,
    onFinish
}) {

    return (
        <li className="todo">
            <input onChange={() => onFinish(todo)}
                className="todo__isDone"
                type="checkbox" name="isDone" id="isDone"
                checked={todo.isDone}
            />
            <p className={todo.isDone ? 'isDone' : ''} >{todo.text}</p>
            <button className="todo__btn" onClick={() => onDelete(todo.id)}>🗑</button>
        </li>
    )
}