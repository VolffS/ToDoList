import React from "react";

export function Spinner() {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary " style={{width: "2.6rem", height: "2.6rem"}} role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
}
export function MiniSpinner() {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary " style={{width: "1rem", height: "1rem"}} role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
}