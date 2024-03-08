import React, {useState} from "react";
import {statusInClassTask} from "../features/helpers";
import {ButtonStatus} from "./buttonStatus";

export function StaticTask({value, stateWideTask, changeStatusCallback, deleteCallback, switchModify}) {
    let {_id, task, status} = value;
    const [stateStatus, setStatus] = useState({status});
    let statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClassTask(status)}`;

    function changeState(ev) {
        setStatus(ev.target.value);
        changeStatusCallback(ev.target.value, _id);
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
                    <ButtonStatus status={"noteWaiting"} changeState={changeState}/>
                    <ButtonStatus status={"noteSuccess"} changeState={changeState}/>
                    <ButtonStatus status={"noteNotSuccess"} changeState={changeState}/>
                </ul>
            </div>
            <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end"
                 style={stateWideTask ? {"flex-wrap": "wrap"} : {}}>

                <button type="button" className="btn btn-primary mb-1 ms-1 btn-modify" onClick={switchModify}>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#change-field"></use>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-danger mb-1 ms-1 btn-delete" onClick={() => {
                    deleteCallback([_id])
                }}>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <use href="#delete-trash"></use>
                    </svg>
                </button>
            </div>
        </div>
    </>);
}