import './App.css';

function DeleteModal(props) {

    return (
        <div className={"backdrop"}>
            <div className={"modal"} id={"delete-modal"}>
                <div className={"modal-text"}>
                are you sure you would like to delete
                    {props.listMode ? ` list ${props.listName}` : (
                        props.mode === "edit" ? " this item?":
                                ` ${props.itemCount} ${props.itemType} items?`
                    ) }

                </div>
                <br/>
                <div className={"modal-buttons"}>
                <button id={"cancel"} onClick={props.onCancel} autoFocus={true}>cancel</button>
                <button id={"confirm"} onClick={props.onDelete}>delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;