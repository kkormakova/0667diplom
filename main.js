let inputAddTask = document.getElementById("inputAddTask");
let addButton = document.getElementById("addButton");
let list = document.getElementById("list");
let tasks = [];

addButton.addEventListener.onclick = () => {
    if (inputAddTask.value){
        addTask(task);
    }
}
function addTask(task) {
    tasks.push(inputAddTask);
}