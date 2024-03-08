import React from "react";

export function ChoiceToDelete({cancelDelete, submitDelete}) {
    return (<>
        <div className="btn-group position-fixed bottom-0 end-0 mb-3 me-3 z-3 ">
            <button type="button" id="delete-cancel" className="btn btn-secondary" onClick={cancelDelete}>
                Отмена
            </button>
            <button type="button" id="delete-submit" className="btn btn-danger" onClick={submitDelete}>
                Удалить
            </button>
        </div>
    </>);
}