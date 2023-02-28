export default function TodoItem({
    todo,
}) {
    return (
        <li class="todo">
            <input class="todo__isDone" type="checkbox" name="isDone" id="isDone" />
            <p class="todo__text">{todo.text}</p>
            <button class="todo__btn">🗑</button>
        </li>
    )
}