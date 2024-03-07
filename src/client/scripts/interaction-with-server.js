async function getToDoListToServer() {
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

async function requestToServer(method, task) {

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

module.exports = {
    getToDoListToServer,
    requestToServer
}