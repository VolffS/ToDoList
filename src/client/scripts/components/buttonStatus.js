import {statusInText} from "../features/helpers";
import React from "react";

export function ButtonStatus({status, changeState}) {
    return <button className="dropdown-item text-black" value={status} onClick={(ev) => {
        changeState(ev)
    }}>{statusInText(status)}</button>
}