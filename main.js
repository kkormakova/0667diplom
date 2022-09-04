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
        todo: inputAddTask.value,
        checked: false,
    };
    //если инпут не пустой то добавляем задачи
    if (inputAddTask.value) { 
        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem("todo", JSON.stringify(todoList)); //Заносим данные в Локал, сохраняем его в JSON
        inputAddTask.value = "";
    }
});

//Функция отображения задачи
function displayMessages() {
    let displayMessage = " ";
    if(todoList.length === 0) todo.innerHTML = "";
    //Перебираем массив и выводим задачи, присваеваем каждой задаче уникальный id
    todoList.forEach((item, i)=>{
        displayMessage += `
        <li class="todoTask">
            <label class="todoCheckbox" >
                <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
                <div></div>
            </label>
            <div for="item_${i}">${item.todo}</div>
            <div class="taskDel" id="del" onclick="deleteTask()"><i class="fa-regular fa-trash-can"></i></div>
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
        
    });
});

function deleteTask() {
        todoList.forEach((i) => {
        todoList.splice(i, 1);
        displayMessages();
        localStorage.setItem("todo",JSON.stringify(todoList));
    });  
}
// todoList.forEach(() => {
//     let dels = document.querySelectorAll("#delete");
//     for (del of dels) {
//         del.addEventListener("click", (event) => {
//             let del = event.target;
//         console.log("click");
//         });
//     }
// });

// let dels = document.querySelectorAll("#delete");
// for (del of dels) {
//     del.addEventListener("click", (event) => {
//         todoList.splice(i, 1);
//         displayMessages();
//         localStorage.setItem("todo",JSON.stringify(todoList));
//     });
// }