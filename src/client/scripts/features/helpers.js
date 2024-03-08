export function changeStyleCSS( selector, property, value ) {
    const stylesheet = document.styleSheets[3];
    let elementRules;

    for (const stylesheetElement of stylesheet.cssRules) {
        if(stylesheetElement.selectorText === selector) {
            elementRules = stylesheetElement;
        }
    }

    elementRules.style.setProperty( property, value);
}

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

export function findParentTask(element) {
    while (element.nodeName!=="LI") {
        element = element.parentNode;
    }
    return element;
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
