export default function Main() {


    return (
        <main class="app__main">
            <div class="todo__input">
                <label for="create-todo">Todo: </label>
                <input type="text" id="create-todo" name="create-todo" />
                <button>Add</button>
            </div>

            <div class="todo__list">

                <ul>

                    <li class="todo">
                        <input class="todo__isDone" type="checkbox" name="isDone" id="isDone" />
                        <p class="todo__text">TASK TEXT</p>
                        <button class="todo__btn">🗑</button>
                    </li>

                    {/*} <li class="todo">
                    <input class="todo__isDone" type="checkbox" name="isDone" id="isDone">
                    <p class="todo__text isDone">TASK TEXT</p>
                    <button class="todo__btn">🗑</button>
                    </li> */}
                </ul>

            </div>
        </main>
    )
}