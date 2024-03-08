import {ButtonDelete} from "./components/buttonDelete";
import React from "react";

export function DropdownButtonDelete({deleteBtnTask, setSelectingWhatDelete, deleteTaskByStatus}) {
    return (<>
        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-bottom"
                data-bs-toggle="dropdown" aria-expanded="false">
            Удаление
        </button>
        <ul id="main-delete" className="dropdown-menu bg-secondary-subtle ">
            <ButtonDelete {...{
                text: "Все", callback: () => {
                    deleteBtnTask([])
                }
            }} />
            <ButtonDelete {...{
                text: "Выбрать", callback: () => {
                    setSelectingWhatDelete(true)
                }
            }} />
            <ButtonDelete {...{
                text: "Все выполненные", callback: () => {
                    deleteTaskByStatus("noteSuccess")
                }
            }} />
            <ButtonDelete {...{
                text: "Все не выполненные", callback: () => {
                    deleteTaskByStatus("noteNotSuccess")
                }
            }} />
        </ul>
    </>);
}