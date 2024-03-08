import {Spinner} from "./spinner";
import {Task} from "./task";
import React from "react";

export function ToDoList({
                             tasks,
                             isLoaded,
                             stateSelectingWhatDelete,
                             deleteBtnTask,
                             changeStatus,
                             addSelectTask,
                             modifyBtnTask
                         }) {
    return (<>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <ul className="list-group">
                {isLoaded && <Spinner/>}
                {!isLoaded && tasks.map((task) => <Task key={task._id.toString()} value={task}
                                                        stateSelectingWhatDelete={stateSelectingWhatDelete}
                                                        deleteBtnTask={deleteBtnTask}
                                                        changeStatus={changeStatus}
                                                        addSelectTask={addSelectTask}
                                                        modifyBtnTask={modifyBtnTask}

                />)}
            </ul>
        </div>
    </>);

}