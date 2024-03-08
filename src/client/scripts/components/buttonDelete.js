import React from "react";

export function ButtonDelete({text, callback}) {
    return (
        <li>
            <button className="dropdown-item text-black" onClick={callback}>
                <strong>{text}</strong>
            </button>
        </li>
    );
}