import React from "react";

export function SelectFilter({callback}) {
    return (<>
        <select onChange={(ev) => {
            callback(ev.target.value)
        }} className="form-select " id="sort-status">
            <option selected value="" disabled>Сортировка...</option>
            <option value="">Без сортировки</option>
            <option value="noteWaiting">Ожидающие</option>
            <option value="noteSuccess">Все выполненные</option>
            <option value="noteNotSuccess">Все не выполненные</option>
        </select>
    </>)
}