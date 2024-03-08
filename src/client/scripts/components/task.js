import React, {useState} from "react";
import {DeleteCheckBox} from "./deleteCheckBox";
import {ModifyTask} from "./modifyTask";
import {StaticTask} from "./staticTask";
import {Spinner} from "./spinner";

export function Task(props) {
    const [stateModifyTask, setModifyTask] = useState(false);
    const [stateWideTask, setWideTask] = useState(false);
    let {_id, task, status} = props.value;
    let deleteCallback = props.deleteBtnTask;
    let changeStatusCallback = props.changeStatus;
    let addSelectTaskCallback = props.addSelectTask;
    let modifyCallback = props.modifyBtnTask;
    let liClassName = `list-group-item list-group-item-action d-flex overflow-y-hidden justify-content-center ${stateModifyTask ? "was-validated" : ""}`;
    let temp

    function switchModify() {
        if (stateModifyTask) {
            props.value.task = "Loading...";
        }
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
                style={stateModifyTask ? {
                    "min-height": "100px",
                    "max-height": " none"
                } : stateWideTask ? {"max-height": "none"} : {}}
                onClick={(ev) => expandLi(ev.target)}>
        {props.stateSelectingWhatDelete && <DeleteCheckBox callback={(ev) => {
            addSelectTaskCallback(_id, ev)
        }}/>}

        {stateModifyTask
            ? <ModifyTask value={props.value} modifyCallback={modifyCallback} switchModify={switchModify}/>
            : task !== ""
                ? <StaticTask {...{
                    value: props.value,
                    stateWideTask: stateWideTask,
                    changeStatusCallback,
                    deleteCallback,
                    switchModify
                }}/>
                : <Spinner/>}
    </li>);
}