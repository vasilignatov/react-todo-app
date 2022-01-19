export function getInputData() { // get input value, clear input field
    const taskField = document.getElementById('task');

    if (taskField.value.trim() == '') {
        return alert('You can\`t crate empty task!');
    }
    const task = taskField.value;
    taskField.value = '';

    return task;
}