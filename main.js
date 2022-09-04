let inputAddTask = document.getElementById("inputAddTask");
let addButton = document.getElementById("addButton");
let list = document.getElementById("list");
let todoList = [];

//Выводим то, что лежало у нас в Локал
if(localStorage.getItem("todo")) {
    todoList = JSON.parse(localStorage.getItem("todo"));//Возвращаем данные из Локал в массив
    displayMessages();
}

//Обрабатываем кнопку добавления
addButton.addEventListener("click", () => {
    let newTodo = {
        id: Date.now(),
        todo: inputAddTask.value,
        checked: false,
    };
    //если инпут не пустой и такой задачи нет в массиве то добавляем задачи
    if (inputAddTask.value && isNotHaveTask(inputAddTask.value, todoList)) { 
        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem("todo", JSON.stringify(todoList)); //Заносим данные в Локал, сохраняем его в JSON
        inputAddTask.value = "";//сбрасываем инпут
    }
});
//Проверка существования задачи в массиве
function isNotHaveTask(todo, taskList) {
    let isNotHave = true;
    taskList.forEach((newTodo) => {
        if(newTodo.todo === todo) {
            alert("Такая задача уже существует!");
            isNotHave = false;
        }
    });
    return isNotHave;
}

//Функция отображения задачи
function displayMessages() {
    let displayMessage = " ";
    if(todoList.length === 0) list.innerHTML = "";//Если масиив пуст то ничего не отображать
    //Перебираем массив и выводим задачи, присваеваем каждой задаче уникальный id
    todoList.forEach((item, i)=>{
        let cls = item.checked ? "complete" : "";
        displayMessage += `
        <li class="todoTask" id=${item.id}>
            <label class="todoCheckbox" >
                <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
                <div></div>
            </label>
            <div  class="${cls}" for="item_${i}">${item.todo}</div>
            <div class="taskDel" id="del"><i class="fa-regular fa-trash-can"></i></div>
        </li>
        `;
        list.innerHTML = displayMessage;
    });
}
//Отслеживаем изменение в задаче и сохраняем в Локал 
list.addEventListener("change", (event) => {
    let idInput = event.target.getAttribute("id");//Получаем id у елемента который меняется
    let forText = document.querySelector('[for = '+ idInput +']');//Ищем div со значением idInput
    let valueText = forText.innerHTML;//Получаем текст задачи из div
    // Ищем в массиве значение и записываем изменения в Локал
    todoList.forEach((item)=> {
        if(item.todo === valueText) {
            item.checked = !item.checked;//Перезаписываем значение checked
            localStorage.setItem("todo",JSON.stringify(todoList));//Заносим изменения checked в Локал
        }
        displayMessages();
    });
});
//По клику вызываем функцию удаления задачи
list.onclick = (event) => {
    let isDelElem = event.target.classList.contains("fa-regular");
    if (isDelElem) {
        let task = event.target.parentElement.parentElement;
        let taskId = task.getAttribute("id");//Ищем id у li
        deleteTask(taskId, todoList);
        displayMessages();
    }
};

//Функция удаления задачи
function deleteTask(id, todoList) {
    todoList.forEach((item, idx) => {
        if(item.id == id) {
            todoList.splice(idx, 1);
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    });
}