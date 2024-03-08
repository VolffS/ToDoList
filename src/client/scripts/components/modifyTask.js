import React, {createRef, useState} from "react";
import {checkInputFull, statusInClassTask} from "../features/helpers";

export function ModifyTask({value, modifyCallback, switchModify}) {
    let {_id, task, status} = value
    const [stateUpdate, setUpdate] = useState(false);
    let statusClass = `m-0 ps-2 pe-2 pb-2 rounded-4 text-task ${statusInClassTask(status)}`
    const textareaRef = createRef();

    function successModify() {
        setUpdate(true);
        if (checkInputFull(textareaRef.current)) {
            let task = {
                _id: `${_id}`,
                task: `${textareaRef.current.value}`,
                status: `${status}`,
            }
            switchModify()
            modifyCallback(task);
        }
    }

    return (<>
        <div className="flex-grow-1">
        <textarea className={statusClass} placeholder="Напиши своё дело" ref={textareaRef}
                  required>{task}</textarea>
        </div>
        <div className="ps-2 d-flex align-items-center">
            <div className="ps-2  form-floating d-grid  d-md-flex justify-content-md-end flex-wrap">
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-success btn-modify-success"
                            onClick={successModify}>
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