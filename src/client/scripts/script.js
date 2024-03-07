import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {changeStyleCSS} from "./features/helpers";
const {statusInClassTask, findParentTask, statusInText, checkInputFull, filterByStatus} = require("./features/helpers")
const {getToDoListToServer, requestToServer} = require("./interaction-with-server");
const {addTask, changeStatusTask, removeToDo} = require('./features/crud');
const initiationToDoList = {
    tasks: [],
    selectTasksId: [],
    filter: ""
}
export function Main() {

    const [stateToDoList, setToDoList] = useState(initiationToDoList);

    useEffect(() => {
        getToDoListToServer().then(tasks => {
            setToDoList({
                tasks: tasks,
                selectTasksId: [],
                filter: ""
            });
        });
    }, []);

    function addBtnTask() {
        let emptyTask = {_id:"", task:"", status:"noteWaiting"}
        let tasks = stateToDoList.tasks;
        tasks.unshift(emptyTask);
        setToDoList(prevState => ({
            ...prevState,
            tasks: tasks
        }));
        addTask().then((task)=>{
            if (task) {
                tasks.shift()
                tasks.unshift(task);
                setToDoList(prevState => ({
                    ...prevState,
                    tasks: tasks
                }))
            }
        })
    }

    function deleteBtnTask(id) {
        let prevSelectTasksId = stateToDoList.selectTasksId
        stateToDoList.selectTasksId = id

        setToDoList(prevState => ({
            ...prevState,
            tasks: removeToDo(stateToDoList),
            selectTasksId: prevSelectTasksId,
        }));
    }

    function modifyBtnTask(task) {
        let tasks = stateToDoList.tasks
        requestToServer('PUT', task);

        for (let i= 0; i<tasks.length; i++) {
            if (tasks[i]._id.toString() === task._id) {
                tasks[i] = task;
            }
        }

        setToDoList(prevState => ({
            ...prevState,
            tasks: tasks
        }));




    }
    function changeStatus(element) {
        stateToDoList.tasks = changeStatusTask(stateToDoList.tasks, element)
        if (stateToDoList.filter!=="") {
            setToDoList(prevState => ({
                ...prevState,
                tasks: changeStatusTask(stateToDoList.tasks, element)
            }))
        }
    }

    function filterTask(status) {
        setToDoList(prevState => ({
            ...prevState,
            filter: status
        }))
   }
    function renderFilterTask() {
        let temp = filterByStatus(stateToDoList.tasks, stateToDoList.filter);

        return  temp.map((task) => <Task key={task._id.toString()} value={task} {...{addSelectTask,deleteBtnTask, modifyBtnTask, changeStatus}}/>)
    }

    function cancelDelete() {
        for (const id of stateToDoList.selectTasksId) {
            let selectCheckBox = document.getElementById(id).querySelector( "input[type='checkbox']");
            selectCheckBox.checked = !selectCheckBox.checked;
        }
        stateToDoList.selectTasksId = [];
        changeStyleCSS('.delete-checkBox', 'display', 'none');
        return stateToDoList.selectTasksId;
    }
    function submitDelete() {
        if (stateToDoList.selectTasksId.length !== 0){
            let temp = stateToDoList.selectTasksId
            stateToDoList.selectTasksId = []
            deleteBtnTask(temp)
            changeStyleCSS('.delete-checkBox', 'display', 'none');
        }
    }

    function deleteTaskByStatus(status) {
        const btnStatus = document.querySelectorAll("li button.dropdown-toggle");
        let ids = [];

        for (const btn of btnStatus) {
            if (btn.value === status) {
                ids.push(findParentTask(btn).id);
            }
        }
        if (ids.length !== 0) {
            deleteBtnTask(ids);
        }
    }

    function addSelectTask(element) {
        let ids = stateToDoList.selectTasksId;
        if (element.checked){
            ids.push(findParentTask(element).id);
        } else {
            for (let i = 0; i<ids.length; i++) {
                if (ids[i] === findParentTask(element).id ) {
                    ids.splice(i,1);
                }
            }
        }

        stateToDoList.selectTasksId = ids;
    }

    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <div className="mb-2  input-group">
                    <input type="text" className="form-control" id="recording-task" name="note" placeholder="Запись"
                           required/>
                    <button type="submit" className="btn btn-success " id="btn-add-note"
                            onClick={addBtnTask}> Добавить
                    </button>
                </div>
                <div className="mb-1  form-floating d-grid  d-md-flex justify-content-md-end">
                    <div className="col-md-3 me-2 rounded-start">
                        <select onChange={(ev)=>{filterTask(ev.target.value)}} className="form-select " id="sort-status">
                            <option selected value="" disabled>Сортировка...</option>
                            <option value="">Без сортировки</option>
                            <option value="noteWaiting">Ожидающие</option>
                            <option value="noteSuccess">Все выполненные</option>
                            <option value="noteNotSuccess">Все не выполненные</option>
                        </select>
                    </div>
                    <div className="btn-group ">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-bottom"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Удаление
                        </button>
                        <ul id="main-delete" className="dropdown-menu bg-secondary-subtle ">
                            <ButtonDelete {...{text:"Все", callback:()=>{deleteBtnTask([])}}} />
                            <ButtonDelete {...{text:"Выбрать", callback:()=>{changeStyleCSS('.delete-checkBox', 'display', '')}}} />
                            <ButtonDelete {...{text:"Все выполненные", callback:()=>{deleteTaskByStatus("noteSuccess")}}} />
                            <ButtonDelete {...{text:"Все не выполненные", callback:()=>{deleteTaskByStatus("noteNotSuccess")}}} />
                        </ul>
                    </div>
                </div>
                <div className="btn-group position-fixed bottom-0 end-0 mb-3 me-3 z-3 delete-checkBox">
                    <button type="button" id="delete-cancel" className="btn btn-secondary" onClick={cancelDelete}>
                        Отмена
                    </button>
                    <button type="button" id="delete-submit" className="btn btn-danger" onClick={submitDelete}>
                        Удалить
                    </button>
                </div>
            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <ul className="list-group">
                    { stateToDoList.filter !== "" ? renderFilterTask()
                        : stateToDoList.tasks.length !== 0
                            ? stateToDoList.tasks.map((task) => <Task key={task._id.toString()} value={task} {...{addSelectTask,deleteBtnTask, modifyBtnTask, changeStatus}}/>)
                            : <Spinner />}
                </ul>
            </div>
        </>
    );
}



function Task(props) {
    const [stateModifyTask, setModifyTask] = useState(false);
    const [stateWideTask, setWideTask] = useState(false);
    let {_id, task, status} = props.value;
    let deleteCallback = props.deleteBtnTask;
    let changeStatusCallback = props.changeStatus;
    let addSelectTaskCallback = props.addSelectTask;
    let modifyCallback = props.modifyBtnTask;
    let liClassName = `list-group-item list-group-item-action d-flex overflow-y-hidden justify-content-center ${stateModifyTask ? "was-validated"  : ""}`;

    function switchModify() {
        setModifyTask(!stateModifyTask);
    }

    function expandLi(element) {
        if (element.nodeName !== "BUTTON" && element.nodeName !== "svg" && element.nodeName !== "use") {
            if (!stateModifyTask) {
                setWideTask(!stateWideTask);
            }
        }
    }

    return (<li id={_id} className={liClassName}
                style={stateModifyTask ? {"min-height":"100px" , "max-height":" none"} : stateWideTask ? {"max-height": "none"} : {}}
                onClick={(ev)=> expandLi(ev.target)}>
        <input type="checkbox" className="delete-checkBox me-2" onChange={(ev)=>{addSelectTaskCallback(ev.target)}}/>
        {stateModifyTask
            ? <ModifyTask {...{value: props.value, modifyCallback, switchModify}}/>
            : task !== ""
                ? <StaticTask {...{value: props.value, stateWideTask:stateWideTask, changeStatusCallback, deleteCallback, switchModify}}/>
                : <Spinner />}
    </li>);
}

function StaticTask({value, stateWideTask, changeStatusCallback, deleteCallback, switchModify}) {
    let {_id, task, status} = value;
    const [stateStatus, setStatus] = useState({status});
    let statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClassTask(status)}`;
    function changeState(ev){
        setStatus(ev.target.value);
        changeStatusCallback(ev.target);
    }

    return (<>
        <div className="flex-grow-1">
            <p className={statusClass}>{task}</p>
        </div>
        <div className="ps-2 d-flex align-items-center">
            <div className="mb-1">
                <button type="button" className="btn btn-primary dropdown-toggle rounded-bottom "
                        value={status}
                        data-bs-toggle="dropdown" aria-expanded="false">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#status-note"></use>
                    </svg>
                </button>
                <ul className="dropdown-menu bg-secondary-subtle status-task position-fixed">
                    <ButtonStatus {...{status: "noteWaiting", changeState}} />
                    <ButtonStatus {...{status: "noteSuccess", changeState}} />
                    <ButtonStatus {...{status: "noteNotSuccess", changeState}} />
                </ul>
            </div>
            <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end" style={stateWideTask ?{"flex-wrap":"wrap"} :{}}>

                <button type="button" className="btn btn-primary mb-1 ms-1 btn-modify" onClick={switchModify}>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#change-field"></use>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-danger mb-1 ms-1 btn-delete" onClick={() => {
                    deleteCallback(_id)
                }}>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#delete-trash"></use>
                    </svg>
                </button>
            </div>
        </div>
    </>);
}

function ModifyTask({value, modifyCallback, switchModify}) {
    let {task, status} = value

    let statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClassTask(status)}`

    function successModify(element) {
        let inputChangeTask = findParentTask(element).querySelector("textarea.text-task");

        if (checkInputFull(inputChangeTask)) {
            let elementTask = findParentTask(element);

            let task = {
                _id: `${elementTask.id}`,
                task: `${inputChangeTask.value}`,
                status: `${status}`,
            }
            switchModify()
            modifyCallback(task);
        }
    }

    return (<>
        <div className="flex-grow-1">
            <textarea className={statusClass} placeholder="Напиши своё дело"
                      required>{task}</textarea>
        </div>
        <div className="ps-2 d-flex align-items-center">
            <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end flex-wrap">
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-success btn-modify-success"
                            onClick={(ev) => {
                                successModify(ev.target)
                            }}>
                        <svg viewBox="0 0 16 16" width="16" height="16">
                            <use href="#change-field-success"></use>
                        </svg>
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-modify-cancel"
                            onClick={switchModify}>
                        <svg viewBox="0 0 16 16" width="16" height="16">
                            <use href="#change-field-cansel"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </>);
}

function ButtonStatus({status, changeState}) {
    return <button className="dropdown-item text-black" value={status} onClick={(ev) => {
        changeState(ev)
    }}>{statusInText(status)}</button>
}

function ButtonDelete({text, callback}) {
    return (
        <li>
        <button className="dropdown-item text-black" onClick={callback}>
                <strong>{text}</strong>
            </button>
        </li>
    );
}

function Spinner() {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary " style={{width: "2.6rem", height: "2.6rem"}} role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
}