import {requestToServerPut} from "../interaction-with-server";

export function changeStatusTask(tasks, status, id) {

    for (let i=0; i<tasks.length; i++) {
        if (tasks[i]._id.toString() === id) {
            tasks[i].status = status;
            requestToServerPut(tasks[i]);

            return tasks;
        }
    }
}
