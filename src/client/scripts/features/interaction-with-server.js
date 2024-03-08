export async function getToDoListToServer() {
    let  tasks = [];
    let postBody = {
        mode: 'cors',
    };

    const response = await fetch("http://localhost:3000/api/ToDoList/Tasks",postBody)
    if (response.ok) {
        return await response.json()
    }

    return tasks;
}

export async function requestToServer(method, task) {

    let postBody = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(task)
    };

    return fetch('http://localhost:3000/api', postBody)
        .then(response => response.json() );
}

export function requestToServerDelete(task) {
    return requestToServer("DELETE", task)
}
export function requestToServerPut(task) {
    return requestToServer("PUT", task)
}
export function requestToServerAdd(task) {
    return requestToServer("POST", task)
}