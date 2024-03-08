import {getToDoListToServer, requestToServer} from "../interaction-with-server";
const {statusTask, findParentTask, checkInputFull} = require("./helpers")

export function changeStatusTask(tasks, element) {

    let status = element.value;
    let task = findParentTask(element.parentNode);


    for (let i=0; i<tasks.length; i++) {
        if (tasks[i]._id.toString() === task.id) {
            tasks[i].status = status;

            requestToServer('PUT', tasks[i]);

            return tasks;
        }
    }
}

export async function addTask() {
    let inputAddTask = document.getElementById("recording-task");
    if (checkInputFull(inputAddTask)) {
        let task = {
            task: `${inputAddTask.value}`,
            status: "noteWaiting"
        }
        inputAddTask.value = "";

        return await requestToServer('POST', task)

    }
    return false
}

export async function removeToDo(toDoList) {
    await requestToServer('DELETE', toDoList.selectTasksId)

    if (toDoList.selectTasksId.length === 0){
        toDoList.tasks = [];

        return toDoList.tasks;
    }
    for (const id of toDoList.selectTasksId) {
        for (let i = 0; i < toDoList.tasks.length; i++) {
            if (toDoList.tasks[i]._id.toString() === id) {
                toDoList.tasks.splice(i, 1);
            }
        }
    }

    return toDoList.tasks;
}