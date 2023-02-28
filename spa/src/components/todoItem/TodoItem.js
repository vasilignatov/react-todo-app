export default function TodoItem({
    todo,
    onFinish,
    onDelete
}) {
    return (
        <li className="todo">
            <input onClick={onFinish} className="todo__isDone" type="checkbox" name="isDone" id="isDone" />
            <p className={todo.isDone ? 'isDone' : ''} >{todo.text}</p>
            <button className="todo__btn" onClick={onDelete}>🗑</button>
        </li>
    )
}