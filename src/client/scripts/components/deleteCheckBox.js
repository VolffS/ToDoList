import React from "react";

export function DeleteCheckBox({callback}) {
    return (<>
        <input type="checkbox" className="me-2" onChange={(ev) => {
            callback(ev.target)
        }}/>
    </>);
}