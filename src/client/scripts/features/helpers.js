export function statusInClassTask(status) {
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
export function statusInText(status) {
    switch (status) {

        case "noteWaiting":
            return  "Ожидает";

        case "noteSuccess":
            return "Выполнено";

        case "noteNotSuccess":
            return "Не выполнено";

        default :
            return "Ожидает";
    }
}

export function checkInputFull(element) {
    return  element.checkValidity()
}

export function filterByStatus(tasks, filter) {

    let sortToDoList = tasks.slice();

    if (filter !== ""){
        sortToDoList = sortToDoList.filter((element)=>{
            return element.status === filter;
        });
    }

    return sortToDoList;
}
