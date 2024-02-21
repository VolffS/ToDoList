let toDoList = {
    tasks: [],
    selectTasksId: [],
    filter: "",
}

addEventDelete();
addEventUl();
addEventSort();

let localToDoList = getToDoListLocalStorage();

if (localToDoList) {
    toDoList = localToDoList;
    redrawToDo(toDoList.tasks);
} else {
    redrawToDo(toDoList.tasks);
}

function redrawToDo(tasks) {
    const listToDo = document.querySelector("ul.list-group");
    listToDo.textContent = "";

    for (const task of tasks) {
        listToDo.appendChild(createTask(task))
    }
}

function updateTable(toDoList) {
    let sortTasks = filterToDoList(toDoList.tasks, toDoList.filter)

    redrawToDo(sortTasks);
}

function createTask(task) {
    let listToDo = document.createElement("li");
    listToDo.classList.add("list-group-item", "list-group-item-action", "d-flex", "overflow-y-hidden");
    listToDo.id = task.id;
    listToDo.innerHTML = creatTaskDocHtml(task);

    refreshEventInTask(listToDo);

    return listToDo;
}

function removeToDo(toDoList) {
    for (let i = 0; i < toDoList.tasks.length; i++) {
        for (const id of toDoList.selectTasksId) {
            if (toDoList.tasks[i].id.toString() === id) {
                toDoList.tasks.splice(i,1);
            }
        }
    }

    toDoList.selectTasksId = [];

    updateTable(toDoList);

    return toDoList;
}

function modifyRow(element) {
    let elementTask = findParentTask(element);
    let taskStatus = elementTask.querySelector("button.dropdown-toggle").value;

    elementTask.style = "min-height: 100px; max-height: none;";
    elementTask.classList.add("was-validated");

    const taskValue = elementTask.querySelector("p").textContent;

    elementTask.innerHTML = `
        <input type="checkbox" class="delete-checkBox me-2" >
        <div class="flex-grow-1">            
            <textarea  class="form-control text-task ${statusTask(taskStatus)}" placeholder="Обязательный пример текстового поля" required>${taskValue}</textarea>
        </div>
        <div class="ps-2 d-flex align-items-center" >
            <div class="mb-1">
                <button type="button" class="btn btn-primary dropdown-toggle rounded-bottom" value="${taskStatus}" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                    <use xlink:href="#status-note"></use></svg>
                </button>
                <ul class="dropdown-menu bg-secondary-subtle status-task position-fixed">
                    <button class="dropdown-item text-black" value="noteWaiting"> Ожидает </button>
                    <button class="dropdown-item text-black" value="noteSuccess"> Выполнено </button>
                    <button class="dropdown-item text-black" value="noteNotSuccess"> Провалено </button>
                </ul>
            </div>
            <div class="ps-2  form-floating d-grid  d-md-flex justify-content-md-end flex-wrap">
                <div class="btn-group-vertical">
                    <button type="button" class="btn btn-success btn-modify-success " >
                    <svg viewBox="0 0 16 16" width="16" height="16">
                    <use xlink:href="#change-field-success"></use></svg>          
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-modify-cancel " >
                    <svg viewBox="0 0 16 16" width="16" height="16" >
                    <use xlink:href="#change-field-cansel"></use></svg>                 
                    </button>
                </div> 
            </div>
        </div>
    `;

    const btnCanselModify = elementTask.getElementsByClassName("btn-modify-cancel")[0];
    const btnModifySuccess = elementTask.getElementsByClassName("btn-modify-success")[0];
    const btnsChangeStatus = elementTask.querySelectorAll("ul.status-task button");
    const checkBoxTask = elementTask.querySelector("input.delete-checkBox");

    btnCanselModify.addEventListener("click", (ev)=> {
        canselModify(toDoList.tasks, ev.target);
    })

    btnModifySuccess.addEventListener("click", (ev)=> {

        toDoList.tasks = successModify(toDoList.tasks, ev.target).tasks;
        saveToDoListLocalStorage(toDoList);
    })

    checkBoxTask.addEventListener("change", (ev)=>{
        toDoList.selectTasksId = addSelectTask(toDoList.selectTasksId, ev.target);
    });

    for (const btnStatus of btnsChangeStatus) {
        btnStatus.addEventListener("click", (ev)=>{

            toDoList.tasks = changeStatusTask(toDoList.tasks, ev.target);
            updateTable(toDoList);
            saveToDoListLocalStorage(toDoList);
        });
    }
}

function successModify(tasks, element) {
    let inputChangeTask = findParentTask(element).querySelector("textarea.text-task");

    if (checkInputFull(inputChangeTask)) {

        let elementTask = findParentTask(element);
        elementTask.style = "";
        let statusTask = elementTask.querySelector("button.dropdown-toggle").value;
        let task = {
            id: `${elementTask.id}`,
            task: `${inputChangeTask.value}`,
            status: `${statusTask}`,
        }
        elementTask.innerHTML = creatTaskDocHtml(task)

        refreshEventInTask(elementTask)

        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].id.toString() === task.id) {
                tasks[i] = task;
                return {
                    tasks: tasks,
                    status: true,
                }
            }
        }
    }
    return {
        tasks: tasks,
        status: false,
    }
}

function canselModify(tasks, element) {
    let elementTask = findParentTask(element);
    elementTask.style = "";

    tasks.find((value)=>{
        if (value.id.toString() === elementTask.id) {
            elementTask.innerHTML = creatTaskDocHtml(value);
        }
    })

    refreshEventInTask(elementTask);
}

const btnAddTask = document.querySelector("button#btn-add-note");
btnAddTask.addEventListener("click",()=>{
    let inputAddTask = document.getElementById("recording-task");

    if (checkInputFull(inputAddTask)) {
        let task = {
            id: `${Math.floor(Math.random() * (2000 - 0) + 0)}`,
            task: `${inputAddTask.value}`,
            status: "noteWaiting",
        }

        toDoList.tasks.unshift(task);

        inputAddTask.value = "";

        saveToDoListLocalStorage(toDoList);

        updateTable(toDoList);
    }
});

function checkInputFull(element) {

    return  element.checkValidity()
}

function creatTaskDocHtml(task) {
    return `    
        <input type="checkbox" class="delete-checkBox me-2" >
        <div class="flex-grow-1 ">
            <p class="m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusTask(task.status)}">${task.task}</p>
        </div>
        <div class="ps-2 d-flex align-items-center" >
            <div class="mb-1">
                <button type="button" class="btn btn-primary dropdown-toggle rounded-bottom " value="${task.status}" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use xlink:href="#status-note"></use>
                    </svg>
                </button>
                <ul class="dropdown-menu bg-secondary-subtle status-task position-fixed" >
                    <button class="dropdown-item text-black" value="noteWaiting"> Ожидает </button>
                    <button class="dropdown-item text-black" value="noteSuccess"> Выполнено </button>
                    <button class="dropdown-item text-black" value="noteNotSuccess"> Провалено </button>
                </ul>
            </div>
            <div class="ps-2  form-floating d-grid  d-md-flex justify-content-md-end">

                <button type="button" class="btn btn-primary mb-1 ms-1 btn-modify">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use xlink:href="#change-field"></use></svg>
                </button>

                <button type="button" class="btn btn-outline-danger mb-1 ms-1 btn-delete">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use xlink:href="#delete-trash"></use></svg>
                </button>
            </div>
        </div>                
    `;
}

function statusTask(status) {
    switch (status) {

        case "noteWaiting":
            return  "bg-transparent";

        case "noteSuccess":
            return "text-bg-success";

        case "noteNotSuccess":
            return "text-bg-danger";

        default :
            return "bg-transparent";
    }
}

function refreshEventInTask(element) {
    const btnsChangeStatus = element.querySelectorAll("ul.status-task button");
    const checkBoxTask = element.querySelector("input.delete-checkBox");
    const btnModify = element.querySelector("button.btn-modify");
    const btnDelete = element.querySelector("button.btn-delete");

    for (const btnStatus of btnsChangeStatus) {
        btnStatus.addEventListener("click", (ev)=>{

            toDoList.tasks = changeStatusTask(toDoList.tasks, ev.target);
            updateTable(toDoList);
            saveToDoListLocalStorage(toDoList);
        });
    }

    btnModify.addEventListener("click", (ev)=>{
        modifyRow(ev.target);
    });

    btnDelete.addEventListener("click", (ev)=>{
        toDoList.selectTasksId.push(findParentTask(ev.target).id);
        toDoList = removeToDo(toDoList);
        saveToDoListLocalStorage(toDoList);
    });

    checkBoxTask.addEventListener("change", (ev)=>{
        toDoList.selectTasksId = addSelectTask(toDoList.selectTasksId, ev.target);
    });
}

function changeStatusTask(tasks, element) {
    let status = element.value;
    let task = findParentTask(element.parentNode);
    let btnStatusTask = task.querySelector("button.dropdown-toggle");
    let taskText = task.querySelector(".text-task");
    const cls = ["text-bg-success", "text-bg-danger", "bg-transparent"];

    btnStatusTask.value = status;

    taskText.classList.remove(...cls);
    taskText.classList.add(statusTask(status));

    for (let i=0; i<tasks.length; i++) {
        if (tasks[i].id.toString() === task.id) {
            tasks[i].status = status;

            return tasks;
        }
    }
}

function addSelectTask(ids,element) {
    if (element.checked){
        ids.push(findParentTask(element).id);
    } else {
        for (let i = 0; i<ids.length; i++) {
            if (ids[i] === findParentTask(element).id ) {
                ids.splice(i,1);
            }
        }
    }
    return ids;
}

function findParentTask(element) {
    while (element.nodeName!=="LI") {
        element = element.parentNode;
    }
    return element;
}

function filterToDoList(tasks, filter) {

    let sortToDoList = tasks.slice();

    if (filter !== ""){
        sortToDoList = sortToDoList.filter((element)=>{
            return element.status === filter;
        });
    }

    return sortToDoList;
}

function changeStyleCSS( selector, property, value ) {
    const stylesheet = document.styleSheets[1];
    let elementRules;

    for (const stylesheetElement of stylesheet.cssRules) {
        if(stylesheetElement.selectorText === selector) {
            elementRules = stylesheetElement;
        }
    }

    elementRules.style.setProperty( property, value);
}

function addEventDelete() {
    const btnsDeleteDropdown = document.querySelectorAll("ul#main-delete button");
    const btnSubmitDelete = document.querySelector("button#delete-submit");
    const btnCancelDelete = document.querySelector("button#delete-cancel");

    btnCancelDelete.addEventListener("click", () => {
        for (const id of toDoList.selectTasksId) {
            let selectCheckBox = document.getElementById(id).querySelector( "input[type='checkbox']");
            selectCheckBox.checked = !selectCheckBox.checked;
        }
        toDoList.selectTasksId = [];

        changeStyleCSS('.delete-checkBox', 'display', 'none');
    });

    btnSubmitDelete.addEventListener("click", () => {
        toDoList = removeToDo(toDoList);

        saveToDoListLocalStorage(toDoList);

        updateTable(toDoList);

        btnCancelDelete.click();
    })

    btnsDeleteDropdown[0].addEventListener("click", ()=>{
        const listTask = document.querySelector("ul.list-group");

        listTask.textContent = "";

        toDoList.tasks = [];
    });

    btnsDeleteDropdown[1].addEventListener("click", ()=>{
        changeStyleCSS('.delete-checkBox', 'display', '')
    });
    btnsDeleteDropdown[2].addEventListener("click", ()=>{
        btnCancelDelete.click();

        toDoList.selectTasksId = deleteTaskByStatus("noteSuccess")

        toDoList = removeToDo(toDoList);
        saveToDoListLocalStorage(toDoList);
    });
    btnsDeleteDropdown[3].addEventListener("click", ()=>{
        btnCancelDelete.click();

        toDoList.selectTasksId = deleteTaskByStatus("noteNotSuccess")

        toDoList =  removeToDo(toDoList);
        saveToDoListLocalStorage(toDoList);
    });
}

function deleteTaskByStatus(status) {
    const btnStatus = document.querySelectorAll("button.dropdown-toggle");
    let ids = [];

    for (const btn of btnStatus) {
        if (btn.value === status) {
            let parent = findParentTask(btn);

            ids.push(parent.id)

            parent.remove();
        }
    }
    return ids;
}

function addEventUl() {
    const listAllTask = document.querySelector("ul.list-group");

    listAllTask.addEventListener("click", (ev)=>{

        if (ev.target.nodeName !== "BUTTON" && ev.target.nodeName !== "svg" && ev.target.nodeName !== "use") {
            let parent = findParentTask(ev.target);
            let btnMofify = parent.querySelector(".btn-modify");

            if (btnMofify) {
                btnMofify.parentNode.classList.toggle("flex-wrap");
                parent.style.cssText !== "max-height: none;"
                    ? parent.style = "max-height: none"
                    : parent.style = "";
            }
        }
    })
}

function addEventSort() {
    const selectSort = document.querySelector("select#sort-status");

    selectSort.addEventListener("change", (ev)=>{
        toDoList.filter = ev.target.value;
        updateTable(toDoList);
    })
}

function saveToDoListLocalStorage(toDoList) {
    localStorage.setItem("toDoList",JSON.stringify(toDoList));
}
function getToDoListLocalStorage() {
    return JSON.parse(localStorage.getItem("toDoList"));
}
